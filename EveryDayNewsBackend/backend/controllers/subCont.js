import Subscription from "../models/sub.js";
import Publication from "../models/Publication.js";

// ✅ Create new subscription after payment
export const createSubscription = async (req, res) => {
  try {
    const { customerId, publicationId } = req.body;

    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    const subscription = new Subscription({
      customerId,
      publicationId,
      publicationName: publication.name,
      amount: publication.monthlyPrice,
      status: "active",
    });

    const saved = await subscription.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ message: "Failed to create subscription", error });
  }
};

// ✅ Get all subscriptions for a specific customer
export const getSubscriptions = async (req, res) => {
  try {
    const { customerId } = req.params;
    const subs = await Subscription.find({ customerId });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscriptions", error });
  }
};

// ✅ Pause, Resume, Cancel
export const updateStatus = async (req, res) => {
  try {
    const { id, action } = req.params;
    let newStatus;

    switch (action) {
      case "pause":
        newStatus = "paused";
        break;
      case "resume":
        newStatus = "active";
        break;
      case "cancel":
        newStatus = "cancelled";
        break;
      default:
        return res.status(400).json({ message: "Invalid action" });
    }

    const updated = await Subscription.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Subscription not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
};
