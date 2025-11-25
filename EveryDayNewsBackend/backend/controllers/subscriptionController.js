
// import Subscription from "../models/Subscription.js";
// import Notification from "../models/Notification.js";
// // Fetch publication name (to include in notification)
// import Publication from "../models/Publication.js";
// // Get all subscriptions for a customer (by name)

// export const getSubscriptions = async (req, res) => {
//   try {
//     const { customerName } = req.query;
//     if (!customerName) {
//       return res.status(400).json({ message: "Customer name is required" });
//     }

//     const subscriptions = await Subscription.find({ customerName })
//       .populate("publication");
//     res.json(subscriptions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching subscriptions", error });
//   }
// };

// // Subscribe to a publication (no JWT, includes notification)
// export const subscribePublication = async (req, res) => {
//   try {
//     const { customerName, publicationId, amount } = req.body;
//     if (!customerName || !publicationId || !amount) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Prevent duplicate subscription
//     const exists = await Subscription.findOne({
//       customerName,
//       publication: publicationId,
//     });

//     if (exists) {
//       return res.status(400).json({ message: "Already subscribed" });
//     }

//     // Create subscription
//     const subscription = await Subscription.create({
//       customerName,
//       publication: publicationId,
//       amount,
//       status: "active",
//     });

//     // 🔔 Create notification for manager
//     const publication = await Publication.findById(publicationId);
//     await Notification.create({
//   title: "New Subscription",
//   message: `${customerName} subscribed to ${publication?.name || "a publication"}.`,
//   type: "success",
// });
//     res.status(201).json({
//       message: "Subscribed successfully",
//       subscription,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Subscription failed",
//       error: error.message,
//     });
//   }
// };

// // Update subscription status
// export const updateSubscriptionStatus = async (req, res) => {
//   const { id, action } = req.params;
//   try {
//     const subscription = await Subscription.findById(id);
//     if (!subscription)
//       return res.status(404).json({ message: "Subscription not found" });

//     if (action === "pause") subscription.status = "paused";
//     if (action === "resume") subscription.status = "active";
//     if (action === "cancel") subscription.status = "cancelled";

//     await subscription.save();
//     res.json({ message: `Subscription ${action}d successfully` });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating subscription", error });
//   }
// };

// // Report missing delivery
// export const reportMissingDelivery = async (req, res) => {
//   try {
//     res.json({ message: "Report submitted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to report missing delivery", error });
//   }
// };
// // controllers/notificationController.js

// export const getNotifications = async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 0;

//     const notifications = await Notification.find()
//       .sort({ createdAt: -1 })
//       .limit(limit);

//     res.json(notifications);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching notifications",
//       error: error.message,
//     });
//   }
// };

import Subscription from "../models/Subscription.js";
import Notification from "../models/Notification.js";
import Publication from "../models/Publication.js";
import Bill from "../models/Bill.js";


// ✅ Get all subscriptions for a customer
export const getSubscriptions = async (req, res) => {
  try {
    const { customerName } = req.query;
    if (!customerName) {
      return res.status(400).json({ message: "Customer name is required" });
    }

    const subscriptions = await Subscription.find({ customerName })
      .populate("publication");

    res.json(subscriptions);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ message: "Error fetching subscriptions", error });
  }
};

// ✅ Subscribe to a publication + Create manager notification
export const subscribePublication = async (req, res) => {
  try {
    const { customerName, publicationId, amount } = req.body;
    if (!customerName || !publicationId || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Prevent duplicate subscription
    const exists = await Subscription.findOne({
      customerName,
      publication: publicationId,
    });
    if (exists) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    // Create new subscription
    const subscription = await Subscription.create({
      customerName,
      publication: publicationId,
      amount,
      status: "active",
    });

    // Fetch publication name for notification
    const publication = await Publication.findById(publicationId);

    // 🔔 Manager notification
    await Notification.create({
      title: "New Subscription",
      message: `${customerName} subscribed to ${publication?.name || "a publication"}.`,
      type: "success",
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscription,
    });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ message: "Subscription failed", error });
  }
};

// ✅ Update subscription status
export const updateSubscriptionStatus = async (req, res) => {
  const { id, action } = req.params;
  try {
    const subscription = await Subscription.findById(id);
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });

    if (action === "pause") subscription.status = "paused";
    if (action === "resume") subscription.status = "active";
    if (action === "cancel") subscription.status = "cancelled";

    await subscription.save();
    res.json({ message: `Subscription ${action}d successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error updating subscription", error });
  }
};

// ✅ Report missing delivery
export const reportMissingDelivery = async (req, res) => {
  try {
    res.json({ message: "Report submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to report missing delivery", error });
  }
};

export const subscribeToPublication = async (req, res) => {
  try {
    const { customerName, publicationId, amount } = req.body;

    // Check if already subscribed
    const existing = await Subscription.findOne({ customerName, publication: publicationId });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    // Create subscription
    const subscription = new Subscription({
      customerName,
      publication: publicationId,
      startDate: new Date(),
      status: "active",
    });
    await subscription.save();

    // Create bill with due date after 1 month
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1); // +1 month

    const publication = await Publication.findById(publicationId);
    const bill = new Bill({
      customerName,
      subscriptionName: publication.name,
      amount,
      dueDate,
      status: "pending",
    });

    await bill.save();

    res.status(201).json({
      message: "Subscription and bill created successfully",
      subscription,
      bill,
    });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ message: "Failed to subscribe", error });
  }
};