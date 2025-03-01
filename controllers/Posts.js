import prisma from "../prisma/index.js";
import fs from "fs";
import path from "path";

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({});
    if (!posts) {
      return res
        .status(404)
        .json({ success: false, message: "No Posts found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Posts fetched successfully", posts });
  } catch (error) {
    console.log("Error in getting posts", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in getting posts" });
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (!post) {
      return res.status(404).json({ success: false, message: "No Post found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Posts fetched successfully", post });
  } catch (error) {
    console.log("Error in getting posts", error);
    return res
      .status(500)
      .json({ success: false, message: "Error in getting posts" });
  }
};

const createPost = async (req, res, next) => {
  try {
    const { slug, title, body, authorId } = req.body;

    if (!slug || !title || !body || !authorId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if image exists in request
    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Get the image filename
    const image = req.files.image[0].filename; 

    // Save post in the database
    const result = await prisma.post.create({
      data: {
        slug,
        title,
        body,
        image, 
        author: { connect: { id: authorId } },
      },
    });

    return res
      .status(201)
      .json({ message: "Post created successfully.", result });
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({ message: "Error in creating post", error: error.message });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    let updatedData = { title, body };

    if (req.files && req.files.image) {
      const newImage = req.files.image[0].filename;

      if (existingPost.image) {
        const imagePath = path.join("uploads", existingPost.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      updatedData.image = newImage;
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: updatedData,
    });

    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
      updatedPost,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to update post", success: false });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      // Prisma error
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error in deleting post",
    });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost };
