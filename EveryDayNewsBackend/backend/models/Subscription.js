import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  // customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  customerName: { type: String, required: true },
  publication: { type: mongoose.Schema.Types.ObjectId, ref: "Publication", required: true },
  startDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["active", "paused", "cancelled", "pending"], default: "pending" },
});

export default mongoose.model("Subscription", subscriptionSchema);
