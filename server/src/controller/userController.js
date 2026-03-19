const bcrypt = require("bcrypt");
const Users = require("../models/userSchema");

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

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
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
    res.status(200).json({
      success: true,
      message: "Login successful",
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

module.exports = { userRegistration, userLogin };
