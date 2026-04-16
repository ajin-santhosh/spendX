import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    tempPasswordHash: String,
    tempPasswordExpiry: Date,
    resetToken: String, // issued after temp password verified
    resetTokenExpiry: Date,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
