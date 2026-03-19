const crypto = require("crypto");
const Otp = require("../models/otpSchema");
const sendMail = require("../utils/otpMailSender");

function generateOTP() {
  length = 6;
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
    const otpDoc = new Otp({
      email,
      otp,
    });
    await otpDoc.save();
    console.log("Generated OTP:", otp);

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
    err.message = `Failed to send e mail or genrate otp`;
    err.statusCode = 500;
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
      message: `emmail resended with otp ${otp}`,
    });
  } catch (err) {
    err.message = `Failed to send mail`;
    err.statusCode = 500;
    next(err);
  }
};
module.exports = { otpSender, otpReSender };
