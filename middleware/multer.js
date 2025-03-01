import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Save files in the "uploads" directory
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Get file extension
      cb(null, Date.now() + ext); // Create a unique file name
    },
  });


  export const upload = multer({
    storage
})