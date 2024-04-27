import express from "express";
import { User } from "../models/User.js";
import { upload } from "./createPost.js";
import bcrypt from "bcrypt";

const profileRouter = express.Router();
//get API
profileRouter.get("/profile/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await User.findById(userid).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});
//put API
profileRouter.put("/profile/:id", async (req, res) => {
  try {
    const userid = req.params.id;
    const user = await User.findById(userid).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const { userName, email, country, state, pincode } = req.body;
    user.userName = userName;
    user.email = email;
    user.country = country;
    user.state = state;
    user.pincode = pincode;
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});
//patch API
profileRouter.patch(
  "/profile/:id",
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const userid = req.params.id;
      const profilePhoto = req.file.path;
      const user = await User.findById(userid);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      user.profilePhoto = profilePhoto;
      await user.save();
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  }
);

profileRouter.patch("/change-password/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const saltValue = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltValue);
    const oldpassword = await bcrypt.compare(oldPassword, user.password);
    if (oldpassword) {
      user.password = hashPassword;
    }
    await user.save();
    res.status(200).json({ message: "Change password successfully!" });
  } catch (error) {
    console.log(error, "change password error!");
  }
});

export default profileRouter;
