import prisma from "../prisma/index.js";
import cookieToken from "../utility/cookieToken.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please provide all the fields");
    }

    //create a user
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    })

    //send cookie
    cookieToken(user,res)

  } catch (error) {  
    throw new Error(error);
  }
};

const loginUser = async () => {};

export { registerUser, loginUser };
