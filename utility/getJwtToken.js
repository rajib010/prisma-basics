import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const getJwtToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.log("JWT Secret missing");
    return;
  }
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "1 day" });
};

export default getJwtToken;
