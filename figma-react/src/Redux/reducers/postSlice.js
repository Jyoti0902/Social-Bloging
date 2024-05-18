import { createSlice } from "@reduxjs/toolkit";
import {
  filterPosts,
  getAllBlogs,
  getByIdBlog,
  searchByTitle,
  searchByTitleOnInput
} from "../actions/post";

const initialState = {
  task: [],
  loading: false,
  error: null,
  getOne: [],
  allpost: [],
  search: [],
};

export const postSlice = createSlice({
  name: "Tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //get blog reducer
    builder.addCase(getAllBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.task = action.payload;
      state.allpost = action.payload;
    });
    builder.addCase(getAllBlogs.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    //getById reducer
    builder.addCase(getByIdBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getByIdBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.getOne = action.payload;
    });
    builder.addCase(getByIdBlog.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    //filter post reducer
    builder.addCase(filterPosts.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(filterPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.task = action.payload;
    });
    builder.addCase(filterPosts.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
    //searchbytitle reducer
    builder.addCase(searchByTitle.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(searchByTitle.fulfilled, (state, action) => {
      state.loading = false;
      state.search = action.payload;
      // state.task = action.payload;
    });
    builder.addCase(searchByTitle.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });///////
    builder.addCase(searchByTitleOnInput.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(searchByTitleOnInput.fulfilled, (state, action) => {
      state.loading = false;
      state.task = action.payload;
    });
    builder.addCase(searchByTitleOnInput.rejected, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});
