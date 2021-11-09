

// Requiring the mongoose module
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Defining the schema of students.
const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  name: String
});

const gallery = mongoose.model("gallery", gallerySchema);
//exporting the student model
export default gallery;
