// controllers/notificationController.js
import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

export const markNotificationRead = async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);
    if (!notif) return res.status(404).json({ message: "Notification not found" });

    notif.read = true;
    await notif.save();

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification", error });
  }
};
