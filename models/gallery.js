

// Requiring the mongoose module
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Defining the schema of students.
const gallerySchema = new mongoose.Schema({
  imageUrl: String
});

const gallery = mongoose.model("gallery", gallerySchema);
//exporting the student model
module.exports = gallery;
