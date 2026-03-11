const bcrypt = require("bcrypt");
const Users = require("../models/userSchema")

const userRegistration =  async (req,res,next) => {
   
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
    const existingUser= await Users.findOne({ email });
    if (existingUser) {
      // return res
      //   .status(409)
      //   .json({ success: false, message: "mail id already in use" });
      const error = new Error("mail id already in use");
      error.statusCode = 409;
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
      data: { email: newUser.email},
    });
  } catch (err) {
   
    if (!err.statusCode) {
    err.message = `Failed to register user: ${err.message}`;
    err.statusCode = 500;
  }
  next(err);
    next(err);
  }
  

}

module.exports ={ userRegistration}