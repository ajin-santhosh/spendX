import crypto from "crypto";
import Otp from "../models/otpSchema.js";
import sendMail from "../utils/otpMailSender.js";
import Users from "../models/userSchema.js";
import bcrypt from "bcrypt";

function generateOTP() {
  const length = 6;
  const digits = "0123456789";
  let otp = "";

  const randomBytes = crypto.randomBytes(length);

  for (let i = 0; i < length; i++) {
    otp += digits[randomBytes[i] % 10];
  }

  return otp;
}

const otpSender = async (req, res, next) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    console.log("Generated OTP:", otp);

    const otpDoc = new Otp({
      email,
      otp,
    });
    await otpDoc.save();

    const sendEmail = await sendMail(email, otp);
    if (!sendEmail) {
      console.log("Brevo Error:", err.response?.data || err.message);
      throw error;
    }
    console.log("MAIL SENT ✅");
    return res.status(201).json({
      success: true,
      message: `mail sended with otp ${otp}`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to send e mail or genrate otp:  ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};
const otpReSender = async (req, res, next) => {
  const { email } = req.body;

  try {
    const otp = generateOTP();
    await Otp.findOneAndUpdate({ email }, { otp }, { new: true, upsert: true });
    console.log("Re Generated OTP:", otp);

    const sendEmail = await sendMail(email, otp);
    if (!sendEmail) {
      console.log("Brevo Error:", err.response?.data || err.message);
      throw error;
    }
    console.log("MAIL SENT ✅");
    return res.status(201).json({
      success: true,
      message: `email resended with otp ${otp}`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to send mail:${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};

async function otpVerifier(req, res, next) {
  const { otp, email } = req.body;
  try {
    if (!otp || !email) {
      const error = new Error("otp and eamil are required");
      error.statusCode = 400;
      throw error;
    }
    const data = await Otp.findOne({ email });
    if (!data) {
      const error = new Error("Invalid email or otp");
      error.statusCode = 400;
      throw error;
    }
    if (data.otp != otp) {
      const error = new Error("Otp not Matched... Please try again..");
      error.statusCode = 400;
      throw error;
    }
    return res.status(201).json({
      success: true,
      message: `Otp Verified`,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to verify otp: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
}
const userRegistration = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
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
export default { otpSender, otpReSender, otpVerifier, userRegistration };
