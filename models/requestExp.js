// Requiring the mongoose module
import mongoose from "mongoose";

// Defining the schema of students.
const requestExp = new mongoose.Schema({
  expId: String,
  userEmail: String,
  reqStatus: Boolean,
  customItemSelected:Array,
  name:String,
  endingDate:Date
});

const reqExp = mongoose.model("reqExp", requestExp);
//exporting the student model
export default reqExp;
