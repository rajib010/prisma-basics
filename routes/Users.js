import { loginUser, registerUser, logoutUser } from "../controllers/User.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
