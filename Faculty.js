import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  qualification: String,
  dept: String,
  password: String
});

export default mongoose.model("Faculty", schema);