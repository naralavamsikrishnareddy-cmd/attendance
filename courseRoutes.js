import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  res.json(await Course.find());
});

// Add course
router.post("/", async (req, res) => {
  try {
    const c = new Course(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete course
router.delete("/:code", async (req, res) => {
  await Course.findOneAndDelete({ code: req.params.code });
  res.json({ message: "Deleted" });
});

export default router;
