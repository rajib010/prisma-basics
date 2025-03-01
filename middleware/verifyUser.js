import jwt from "jsonwebtoken";
import prisma from "../prisma/index.js";

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      }
    });

    next()

  } catch (error) {
    throw new Error("Error in verifying user", error);
  }
};

export default verifyUser;
