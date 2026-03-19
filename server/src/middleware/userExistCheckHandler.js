const Users = require("../models/userSchema");
const Otp = require("../models/otpSchema");

const userCheck = async (req, res, next) => {
  const { email, password } = req.body;
  if (password.length < 6) {
    const error = new Error("Your password must be atleast 6 digit");
    error.statusCode = 409;
    throw error;
  }
  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      const error = new Error("mail id already in use");
      error.statusCode = 409;
      throw error;
    }

    next();
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to check user: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};
const emailCheck = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existingEmail = await Otp.findOne({ email });

    if (existingEmail) {
      const error = new Error("mail id already in use");
      error.statusCode = 409;
      throw error;
    }

    next();
  } catch (err) {
    if (!err.statusCode) {
      err.message = `Failed to register user: ${err.message}`;
      err.statusCode = 500;
    }
    next(err);
  }
};
module.exports = { userCheck, emailCheck };
