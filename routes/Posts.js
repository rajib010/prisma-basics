import { upload } from "../middleware/multer.js";
import { Router } from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
} from "../controllers/Posts.js";
import verifyUser from "../middleware/verifyUser.js";

const postRouter = Router();

postRouter.use(
  verifyUser,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ])
);

postRouter.get("/get", getAllPosts);

postRouter.get("/get/:id", getPostById);

postRouter.post("/create", createPost);

postRouter.delete("/delete/:id", deletePost);

postRouter.patch("/update/:id", updatePost);

export default postRouter;
