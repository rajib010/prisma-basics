import prisma from "../prisma/index.js";
import cookieToken from "../utility/cookieToken.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please provide all the fields");
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "user created successfully. Please login",
    });
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("All the fields are required");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User does not exist.");
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Password incorrect");
    }

    // Assuming cookieToken is a function that sets the token as a cookie
    cookieToken(user, res);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in Login", error: error.message });
  }
};


const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    throw new Error("Error in logout", error);
  }
};

export { registerUser, loginUser, logoutUser };
