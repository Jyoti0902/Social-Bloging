import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CommentDo,
  Create,
  DeleteComment,
  Filter,
  GetBlogById,
  GetBlogs,
  SearchByTitle,
  Update,
  UpdateWithPatch,
  deleteBlog,
} from "../../APIs/endpoints";

//get all blogs
export const getAllBlogs = createAsyncThunk("post/getallblogs", async () => {
  try {
    const res = await GetBlogs();
    return res.data;
  } catch (error) {
    console.log("Error in getting all blogs!");
    return error;
  }
});
//create blog
export const createBlog = createAsyncThunk(
  "post/createBlog",
  async (formData) => {
    try {
      const res = await Create(formData);
      return res.data;
    } catch (error) {
      console.log("Error in creating blogs!");
      return error;
    }
  }
);
//get blog by id
export const getByIdBlog = createAsyncThunk("post/getByIdBlog", async (blogId) => {
  try {
    const res = await GetBlogById(blogId);
    return res.data;
  } catch (error) {
    console.log(error, "getById redux error!");
  }
});
//update with put
export const updateBlog = createAsyncThunk(
  "post/updateBlog",
  async ({ formData, id }) => {
    try {
      const res = await Update(formData, id);
      return res.data;
    } catch (error) {
      console.log(error, "Update redux error!");
    }
  }
);
//update with patch
export const updateWithPatch = createAsyncThunk(
  "post/updateWithPatch",
  async ({ updated, id }) => {
    try {
      const res = await UpdateWithPatch(updated, id);
      return res.data;
    } catch (error) {
      console.log(error, "Update with patch redux error!");
    }
  }
);
//delete blog by id
export const deleteBlogById = createAsyncThunk(
  "post/deleteBlogById",
  async (id) => {
    try {
      await deleteBlog(id);
    } catch (error) {
      console.log(error, "Delete blog redux error!");
    }
  }
);

//filter posts
export const filterPosts = createAsyncThunk(
  "post/filterPosts",
  async ({ title, created_Date }) => {
    try {
      const res = await Filter(title, created_Date);
      return res.data;
    } catch (error) {
      console.log(error, "filterPosts redux error!");
    }
  }
);
//search by title

export const searchByTitle = createAsyncThunk(
  "post/searchByTitle",
  async (title) => {
    try {
      const res = await SearchByTitle(title);
      return res.data;
    } catch (error) {
      console.log(error, "searchByTitle redux error!");
    }
  }
);
export const searchByTitleOnInput = createAsyncThunk(
  "post/searchByTitleOnInput",
  async (title) => {
    try {
      const res = await SearchByTitle(title);
      return res.data;
    } catch (error) {
      console.log(error, "searchByTitle redux error!");
    }
  }
);

//comments actions
export const doComments = createAsyncThunk(
  "post/doComments1",
  async ({ comments, id }) => {
    try {
      const res = await CommentDo(comments, id);
      return res.data;
    } catch (error) {
      console.log(error, "docomment redux error!");
    }
  }
);
export const deleteComments = createAsyncThunk(
  "post/deleteComments",
  async ({ id, commentId }) => {
    try {
      const res = await DeleteComment(id, commentId);
      return res.data;
    } catch (error) {
      console.log(error, "documment redux error!");
    }
  }
);

