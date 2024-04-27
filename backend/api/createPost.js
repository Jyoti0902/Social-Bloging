import express, { query } from "express";
import { postModel } from "../models/Post.js";
import { applyMiddleWare } from "../middleware/middlewareAuth.js";
import multer from "multer";
import moment from "moment";

const postApp = express.Router();
//file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
//use storage
export const upload = multer({ storage: storage });
//post API
postApp.post(
  "/create",
  applyMiddleWare,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const image = req.file.path;
      if (!title || !description || !image) {
        res.status(400).json({ message: "All fields are required!" });
      } else {
        const post = new postModel({
          title,
          description,
          image,
          liked: false,
          comment: false,
          created_Date: new Date(),
        });
        const newPost = await post.save();
        res.json(newPost);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
//delete API
postApp.delete("/:id", applyMiddleWare, async (req, res) => {
  const id = req.params.id;
  try {
    await postModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
  }
});
//get API
postApp.get("/", applyMiddleWare, async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});
//filter get API
postApp.get("/filtered", async (req, res) => {
  try {
    const { title, created_Date } = req.query;
    let query = {};
    if (title) {
      query.title = title;
    }
    if (created_Date) {
      const startOfDay = moment(created_Date).startOf("day").toDate();
      const endOfDay = moment(created_Date).endOf("day").toDate();
      query.created_Date = { $gte: startOfDay, $lte: endOfDay };
    }
    const post = await postModel.find(query);
    res.json(post);
  } catch (err) {
    console.log(err, "errrrrrr");
  }
});
//search API
postApp.get("/search", async (req, res) => {
  try {
    const { searchBy } = req.query;
    // if (searchBy) {
    //   return res.json([]);
    // }
    const searched = await postModel.find({ title: { $regex: searchBy } });
    res.json(searched);
  } catch (error) {
    console.log(error, "search API error!");
  }
});
//get particular id
postApp.get("/:id", applyMiddleWare, async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findById(id);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});
//put API
postApp.put("/:id", applyMiddleWare, async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      res.status(400).json({ message: "All fields are required!" });
    } else {
      const updatedBlog = await postModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          image,
          updated_Date: new Date(),
        },
        { new: true }
      );
      res.json(updatedBlog);
    }
  } catch (error) {
    console.log(error);
  }
});
//patch API
postApp.patch("/update/:id", applyMiddleWare, async (req, res) => {
  try {
    const id = req.params.id;
    const updated = req.body;
    const updatedBlog = await postModel.findByIdAndUpdate(id, updated, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
});
//comment post API
postApp.post("/:id/comments", applyMiddleWare, async (req, res) => {
  const id = req.params.id;
  const { comments } = req.body;
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    post.postComments.push({ comments });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
  }
});
//Get Comments API
// postApp.get("/post/:id/comments", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const post = await postModel.findById(id);
//     res.json(post.postComments);
//   } catch (error) {
//     console.log(error);
//   }
// });
//delete comment API
postApp.delete("/:id/comments/:commentId", async (req, res) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }
    // const delComment = await postModel.findByIdAndDelete(commentId);
    post.postComments.pull(commentId);
    await post.save();
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

export default postApp;
