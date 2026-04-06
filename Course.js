import mongoose from "mongoose";

const schema = new mongoose.Schema({
  code: String,
  name: String,
  dept: String,
  section: String,
  credits: Number
});

export default mongoose.model("Course", schema);