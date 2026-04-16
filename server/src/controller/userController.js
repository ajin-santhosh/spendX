import bcrypt from "bcrypt";
import crypto from "crypto";
import Users from "../models/userSchema.js";
import sendPassMail from "../utils/forgetPasswordMailSender.js";
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
import { error } from "console";

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

// User Login..............
const userLogin = async (req, res, next) => {
  const { email, password, deviceId: clientDeviceId } = req.body;
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
    const accessToken = signAccessToken(user._id);
    const refreshToken = await createRefreshToken(
      user._id,
      deviceId,
      meta(req),
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...secureCookieOpts,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        ...secureCookieOpts,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      // Readable — client needs these to send back on refresh / manage sessions
      .cookie("deviceId", deviceId, {
        ...readableCookieOpts,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("uid", user._id.toString(), {
        ...readableCookieOpts,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
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

const userRefresh = async (req, res, next) => {
  try {
    const { refreshToken, deviceId, uid } = req.cookies;

    if (!refreshToken || !deviceId || !uid) {
      const error = new Error("No session");
      error.statusCode = 401;
      throw error;
    }

    const session = await verifyRefreshToken(uid, deviceId, refreshToken);

    if (!session) {
      // Token gone from Redis = expired or already rotated (possible theft)
      clearAuthCookies(res);
      const error = new Error("Session expired");
      error.statusCode = 401;
      throw error;
    }

    // Rotate: old token deleted, new one issued
    const newRefreshToken = await rotateRefreshToken(uid, deviceId, meta(req));
    const newAccessToken = signAccessToken(uid);

    res
      .cookie("accessToken", newAccessToken, {
        ...secureCookieOpts,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", newRefreshToken, {
        ...secureCookieOpts,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Token refreshed" });
  } catch (err) {
    console.error("[refresh]", err);
    if (!err.statusCode) {
      err.message = `Refresh failed: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};

const userLogout = async (req, res, next) => {
  try {
    const { deviceId, uid } = req.cookies;
    if (uid && deviceId) await revokeSession(uid, deviceId);
    clearAuthCookies(res).json({ message: "Logged out" });
  } catch (err) {
    console.error("[logout]", err);
    if (!err.statusCode) {
      err.message = `Logout failed: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    // Always return 200 — never reveal if email exists
    if (!user) {
      const error = new Error(
        "If this email is registered, a temp password was sent.",
      );
      error.statusCode = 200;
      throw error;
    }

    // Generate a clean readable temp password e.g. "aB3kX9pQ2m"
    const tempPassword = crypto
      .randomBytes(8)
      .toString("base64url")
      .slice(0, 10);

    const salt = await bcrypt.genSalt(12);
    user.tempPasswordHash = await bcrypt.hash(tempPassword, salt);
    user.tempPasswordExpiry = new Date(Date.now() + 30 * 60 * 1000); // 30 mins
    await user.save();

    await sendPassMail(user.email, tempPassword);

    return res.status(200).json({
      success: true,
      message: "If this email is registered, a temp password was sent.",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to send e mail or create tempPassword:  ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};
const verifyTempPassword = async (req, res, next) => {
  const { email, tempPassword } = req.body;

  try {
    const user = await Users.findOne({ email });

    // Generic error — don't reveal specifics
    if (!user || !user.tempPasswordHash || !user.tempPasswordExpiry) {
      const error = new Error("Invalid or expired temp password.");
      error.statusCode = 400;
      throw error;
    }

    // Check expiry
    if (user.tempPasswordExpiry < new Date()) {
      const error = new Error(
        "Temp password has expired. Please request a new one.",
      );
      error.statusCode = 400;
      throw error;
    }

    // Compare against stored hash
    const isMatch = await bcrypt.compare(tempPassword, user.tempPasswordHash);
    if (!isMatch) {
      const error = new Error("Invalid or expired temp password.");
      error.statusCode = 400;
      throw error;
    }

    // Issue a short-lived single-use reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken; // store plain — it's not a password
    user.resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Clear the temp password — it's been used
    user.tempPasswordHash = undefined;
    user.tempPasswordExpiry = undefined;
    await user.save();

    // Send reset token to frontend — it will pass this on the next step
    return res.status(200).json({
      success: true,
      message: "Temp password verified.",
      resetToken, // frontend stores this, sends with next request
      email, // pass along so frontend doesn't need to re-ask
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to verify temp password:  ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};
const setNewPassword = async (req, res, next) => {
  const { email, resetToken, newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    const error = new Error("Password must be at least 6 characters.");
    error.statusCode = 400;
    throw error;
  }

  try {
    const user = await Users.findOne({ email });

    if (!user || !user.resetToken || !user.resetTokenExpiry) {
      const error = new Error("invalid or expired reset session.");
      error.statusCode = 400;
      throw error;
    }

    // Check token expiry
    if (user.resetTokenExpiry < new Date()) {
      const error = new Error("Reset session expired. Please start over.");
      error.statusCode = 400;
      throw error;
    }

    // Compare reset token (constant-time compare prevents timing attacks)
    const tokenMatch = crypto.timingSafeEqual(
      Buffer.from(user.resetToken),
      Buffer.from(resetToken),
    );
    if (!tokenMatch) {
      const error = new Error("Invalid or expired reset session.");
      error.statusCode = 400;
      throw error;
    }

    // Hash and save new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clean up all reset fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated. Please log in.",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to verify new password:  ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};

export default {
  userLogin,
  userRefresh,
  userLogout,
  forgetPassword,
  verifyTempPassword,
  setNewPassword,
};
