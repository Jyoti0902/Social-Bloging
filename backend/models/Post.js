import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_Date: {
    type: Date,
  },
  updated_Date: {
    type: Date,
  },
  liked: {
    type: Boolean,
  },
  comment: {
    type: Boolean,
  },
  postComments: [
    {
      comments: {
        type: String,
      },
      postedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const postModel = mongoose.model("post", postSchema);
