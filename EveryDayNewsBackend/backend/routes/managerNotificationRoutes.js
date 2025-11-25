import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// ✅ Get recent notifications (supports ?limit=5)
router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0; // default all if not provided
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
});

// Mark notification as read
router.post("/:id/read", async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    notif.read = true;
    await notif.save();
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification", error });
  }
});

export default router;
