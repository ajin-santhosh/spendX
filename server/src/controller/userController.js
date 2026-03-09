const bcrypt = require("bcrypt");
const Users = require("../models/userSchema")

const userRegistration =  async (req,res) => {
   
    const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "email and password are required" });
    }
    const existingUser= await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "mail id already in use" });
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
  } catch (error) {
    console.error("Error saving user data:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }

}

module.exports ={ userRegistration}