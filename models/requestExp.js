// Requiring the mongoose module
import mongoose from "mongoose";

// Defining the schema of students.
const requestExp = new mongoose.Schema({
  expID: String,
  userEmail: String,
  reqStatus: Boolean
});

const reqExp = mongoose.model("reqExp", requestExp);
//exporting the student model
export default reqExp;
