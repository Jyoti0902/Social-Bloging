import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResetPasswordAPI, SendForgotEmail } from "../../APIs/endpoints";

export const ForgotPasswordEmail = createAsyncThunk(
  "auth/SendForgotEmail",
  async (emailSent) => {
    try {
      const res = SendForgotEmail(emailSent);
      return res.data;
    } catch (error) {
      console.log("SendForgotEmail redux error!");
    }
  }
);
export const passwordReset = createAsyncThunk(
    "auth/ResetPasswordAPI",
    async (resetDetails) => {
      try {
        const res = ResetPasswordAPI(resetDetails);
        return res.data;
      } catch (error) {
        console.log("ResetPasswordAPI redux error!");
      }
    }
  );
