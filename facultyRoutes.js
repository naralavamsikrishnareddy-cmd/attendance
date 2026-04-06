import express from "express";
import Faculty from "../models/Faculty.js";

const router = express.Router();

// Get all faculty
router.get("/", async (req, res) => {
  res.json(await Faculty.find());
});

// Add faculty
router.post("/", async (req, res) => {
  try {
    const f = new Faculty(req.body);
    await f.save();
    res.status(201).json(f);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Update faculty
router.put("/:id", async (req, res) => {
  const updated = await Faculty.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  res.json(updated);
});

// Approve faculty
router.patch("/:id/approve", async (req, res) => {
  const updated = await Faculty.findOneAndUpdate(
    { id: req.params.id },
    { approved: req.body.approved },
    { new: true }
  );
  res.json(updated);
});

// Delete faculty
router.delete("/:id", async (req, res) => {
  await Faculty.findOneAndDelete({ id: req.params.id });
  res.json({ message: "Deleted" });
});

// Change password
router.post("/change-password", async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  const user = await Faculty.findOne({ id });
  if (!user || user.password !== oldPassword)
    return res.status(400).json({ error: "Wrong password" });
  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated" });
});

export default router;
