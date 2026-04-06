import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// Get all attendance
router.get("/", async (req, res) => {
  res.json(await Attendance.find());
});

// Post attendance
router.post("/", async (req, res) => {
  try {
    const data = new Attendance(req.body);
    await data.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
