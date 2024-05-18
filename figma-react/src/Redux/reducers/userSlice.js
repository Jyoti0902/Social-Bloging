import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../actions/user";

const initialState = {
  user: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = true; 
      state.error = action.payload;
    });
  },
});
