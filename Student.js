import mongoose from "mongoose";

const schema = new mongoose.Schema({
  rollNo: String,
  name: String,
  dept: String,
  section: String,
  email: String,
  phone: String,
  password: String
});

export default mongoose.model("Student", schema);