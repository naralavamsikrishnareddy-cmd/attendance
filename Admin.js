import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  id: String,
  password: String
});

export default mongoose.model("Admin", adminSchema);