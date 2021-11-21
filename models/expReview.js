import mongoose from "mongoose";

const expReview = new mongoose.Schema({
  expId: String,
  name: String,
  userEmail: String,
  rating: String,
  desc: String
});

const review = mongoose.model("review", expReview);
export default review;
