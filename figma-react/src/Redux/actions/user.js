import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChangePasswordAPI,
  getProfileDetails,
  updateProfile,
  updateProfilePhoto,
} from "../../APIs/endpoints";

export const getUserProfile = createAsyncThunk(
  "user/getProfileDetails",
  async (userId) => {
    try {
      const res = await getProfileDetails(userId);
      return res.data;
    } catch (error) {
      console.log(error, "getUserProfile redux error!");
    }
  }
);
//update user profile details
export const updateUserDetail = createAsyncThunk(
  "user/updateUserDetail",
  async ({ userDetails, userId }) => {
    try {
      const res = updateProfile(userDetails, userId);
      return res.data;
    } catch (error) {
      console.log(error, "updateUserDetail redux error");
    }
  }
);
//update user profile photo
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ formData, userId }) => {
    try {
      const res = updateProfilePhoto(formData, userId);
      return res.data;
    } catch (error) {
      console.log(error, "updateUserProfile redux error");
    }
  }
);

//change password
export const passwordChange = createAsyncThunk(
  "user/ChangePassword",
  async ({ newpassword, userId }) => {
    try {
      const res = ChangePasswordAPI(newpassword, userId);
      return res.data;
    } catch (error) {
      console.log(error, "ChangePassword redux error");
    }
  }
);
