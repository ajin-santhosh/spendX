import bcrypt from "bcrypt";
import Users from "../models/userSchema.js";
import { v4 as uuidv4 } from "uuid";
import {
  signAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  rotateRefreshToken,
  revokeSession,
  revokeAllSessions,
  listSessions,
} from "../utils/token.js";

const secureCookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict", // blocks CSRF — cookie not sent on cross-site requests
};

// Readable cookies — client JS needs to read these (not secrets)
const readableCookieOpts = {
  httpOnly: false,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

// Helper — extract request metadata for session storage
function meta(req) {
  return {
    userAgent: req.headers["user-agent"] || "",
    ip: req.ip || "",
  };
}
// Helper — clear all auth cookies at once

function clearAuthCookies(res) {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .clearCookie("deviceId")
    .clearCookie("uid");
}
const userRegistration = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      // return res
      //   .status(400)
      //   .json({ success: false, message: "email and password are required" });
      const error = new Error("email and password are required");
      error.statusCode = 400;
      throw error;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: { email: newUser.email },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to register user: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};

// User Login..............
const userLogin = async (req, res, next) => {
  const { email, password,deviceId: clientDeviceId  } = req.body;
  if (!email || !password) {
    const error = new Error("email and password are required");
    error.statusCode = 400;
    throw error;
  }
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      const error = new Error("Invalid user or Password");
      error.statusCode = 400;
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Password not Match... Please try again..");
      error.statusCode = 400;
      throw error;
    }
        const deviceId = clientDeviceId || uuidv4();
    const accessToken  = signAccessToken(user._id);
    const refreshToken = await createRefreshToken(user._id, deviceId, meta(req));

    res.status(200).
    cookie('accessToken',  accessToken,  { ...secureCookieOpts, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', refreshToken, { ...secureCookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
      // Readable — client needs these to send back on refresh / manage sessions
      .cookie('deviceId', deviceId,         { ...readableCookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .cookie('uid',      user._id.toString(), { ...readableCookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .json({
      success: true,
      message: "Login successful",
      deviceId,
      data: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to register user: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};

const userRefresh = async (req,res,next) =>{

  try {
    const { refreshToken, deviceId, uid } = req.cookies;
 
    if (!refreshToken || !deviceId || !uid) {
      const error = new Error("No session")
      error.statusCode = 401;
      throw error;
    }
 
    const session = await verifyRefreshToken(uid, deviceId, refreshToken);
 
    if (!session) {
      // Token gone from Redis = expired or already rotated (possible theft)
      clearAuthCookies(res);
      const error = new Error("Session expired")
      error.statusCode=401
      throw error
    }
 
    // Rotate: old token deleted, new one issued
    const newRefreshToken = await rotateRefreshToken(uid, deviceId, meta(req));
    const newAccessToken  = signAccessToken(uid);
 
    res
      .cookie('accessToken',  newAccessToken,  { ...secureCookieOpts, maxAge: 15 * 60 * 1000 })
      .cookie('refreshToken', newRefreshToken, { ...secureCookieOpts, maxAge: 7 * 24 * 60 * 60 * 1000 })
      .json({ message: 'Token refreshed' });
 
  } catch (err) {
    console.error('[refresh]', err);
    if (!err.statusCode) {
      err.message = `Refresh failed: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};

const userLogout = async (req,res,next) =>{
  try {
    const { deviceId, uid } = req.cookies;
    if (uid && deviceId) await revokeSession(uid, deviceId);
    clearAuthCookies(res).json({ message: 'Logged out' });
  } catch (err) {
    console.error('[logout]', err);
    if (!err.statusCode) {
      err.message = `Logout failed: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
  
}


export default { userRegistration, userLogin,userRefresh,userLogout };
