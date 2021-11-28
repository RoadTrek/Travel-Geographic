
// Requiring the mongoose module
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Defining the schema of students.
const userSchema = new mongoose.Schema({
  name: String,
  email:String,
  contactNumber: String,
  password: String,
  expeditionEnrolled:Array,
  approveId:Array,
  imageUrl:String,
});

const user = mongoose.model("user", userSchema);
//exporting the student model
export default user;
