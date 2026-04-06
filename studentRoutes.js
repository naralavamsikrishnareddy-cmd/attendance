import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Get all students
router.get("/", async (req, res) => {
  res.json(await Student.find());
});

// Add student
router.post("/", async (req, res) => {
  try {
    const s = new Student(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update student
router.put("/:rollNo", async (req, res) => {
  const updated = await Student.findOneAndUpdate(
    { rollNo: req.params.rollNo },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Change section
router.patch("/:rollNo/section", async (req, res) => {
  const updated = await Student.findOneAndUpdate(
    { rollNo: req.params.rollNo },
    { section: req.body.section },
    { new: true }
  );
  res.json(updated);
});

// Delete student
router.delete("/:rollNo", async (req, res) => {
  await Student.findOneAndDelete({ rollNo: req.params.rollNo });
  res.json({ message: "Deleted" });
});

// Change password
router.post("/change-password", async (req, res) => {
  const { rollNo, oldPassword, newPassword } = req.body;
  const user = await Student.findOne({ rollNo });
  if (!user || user.password !== oldPassword)
    return res.status(400).json({ error: "Wrong password" });
  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated" });
});

export default router;
