import mongoose from "mongoose";

const schema = new mongoose.Schema({
  courseCode: String,
  date: String,
  slot: String,
  facultyId: String,
  records: [
    {
      rollNo: String,
      status: String
    }
  ]
});

export default mongoose.model("Attendance", schema);