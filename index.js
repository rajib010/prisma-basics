import express from "express";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send();
});

import userRouter from "./routes/Users.js";

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("Server is runing on port 3000");
});
