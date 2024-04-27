import express from "express";
import { mongoose } from "mongoose";
import authRouter from "./api/auth.js";
import dotenv from "dotenv";
import postApp from "./api/createPost.js";
import cors from "cors";
import profileRouter from "./api/userProfile.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(cors());
//file storage
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
app.use("/uploads", express.static(join(_dirname, "uploads")));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/post", postApp);
app.use("/userProfile", profileRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
mongoose
  .connect(process.env.CONNECTION_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((error) => {
    console.log("Database is not connected!", error);
  });
