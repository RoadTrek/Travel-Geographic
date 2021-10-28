
// Requiring the mongoose module
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Defining the schema of students.
const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  contactNumber: String,
  password: String
});

const user = mongoose.model("user", userSchema);
//exporting the student model
module.exports = user;
