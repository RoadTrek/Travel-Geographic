
// Requiring the mongoose module
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Defining the schema of students.
const expeditionSchema = new mongoose.Schema({
  name: String,
  description: String,
  basePrice: String,
  imageUrl: Array,
  customItems: Array,
  registeredUsers: Array,
  reviews: Array,
  endingDate:Date,
});

const expedition = mongoose.model("expedition", expeditionSchema);
//exporting the student model
export default expedition;
