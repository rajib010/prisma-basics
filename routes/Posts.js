import { upload } from "../middleware/multer.js";
import { Router } from "express";
import { createPost } from "../controllers/Posts.js";
import verifyUser from "../middleware/verifyUser.js";

const postRouter = new Router();

postRouter.post("/create",
  verifyUser,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  createPost
);

export default postRouter;
