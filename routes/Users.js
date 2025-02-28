import { loginUser, registerUser } from "../controllers/User.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
