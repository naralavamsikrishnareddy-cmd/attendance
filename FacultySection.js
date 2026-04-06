import mongoose from "mongoose";

const schema = new mongoose.Schema({
  facultyId: String,
  courseCode: String
});

export default mongoose.model("FacultySection", schema);