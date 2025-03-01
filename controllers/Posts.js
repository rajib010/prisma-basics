const createPost = async (req, res) => {
  try {
    const { slug, title, body } = req.body;
    const image = req.files.image;
    const authorId = req.user.id;
    console.log(image)
    return res.status(200).json({ message: "Create post route hit" });
  } catch (error) {
    throw new Error("Error in creating post", error);
  }
};

export { createPost };
