import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "./reducers/postSlice";
import { userSlice } from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    Tasks: postSlice.reducer,
    User: userSlice.reducer,
  },
});
