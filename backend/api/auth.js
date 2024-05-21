import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const authRouter = express.Router();
//send email
const transporter = nodemailer.createTransport({
  service: "gmail", // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "jyotibrar0902@gmail.com",
    pass: "dusn qbkh xpuw ooob",
  },
});
//Send email API
authRouter.post("/send-mail", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Receivers email not found!" });
    }
    const mailOption = {
      from: "jyotibrar0902@gmail.com",
      to: email,
      subject: "Forgot password!",
      text: `Click on this link to reset password! : https://blog-nest-jvu0.onrender.com/${email}`,
    };
    await transporter.sendMail(mailOption);
    res
      .status(200)
      .json({ message: "Reset password link has been sent to your email" });
  } catch (error) {
    console.log(error);
  }
});
//reset password API
authRouter.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Receivers email not found!" });
    }
    const saltValue = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltValue);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Reset password successfully!" });
  } catch (error) {
    console.log(error, "forgot password api error");
  }
});
//signupAPI
authRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    //validation
    const existingUser = await User.findOne({ email });
    if (!userName || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "All fields are required!" });
    }
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    if (!password == confirmPassword) {
      res.status(400).json({ message: "Confirm password does'nt match!" });
    }
    const saltValue = 10;
    const hashPassword = await bcrypt.hash(password, saltValue);
    const user = new User({
      userName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "User created successfuly!" });
  } catch (error) {
    console.log(error);
  }
});
authRouter.post("/login", async (req, res) => {
  const { email, password, userName } = req.body;
  if (!(email || userName) || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (!existingUser) {
    res.status(404).json({ message: "User not found!" });
  }
  const matchPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchPassword) {
    return res.status(400).json({ message: "Invalid password!" });
  }
  const token = jwt.sign(
    { userId: existingUser._id },
    process.env.JWT_SECRET_KEY
  );
  const userId = existingUser._id;
  // console.log(userId);
  res.status(200).json({ message: "Login successfully", token, userId });
});
export default authRouter;
