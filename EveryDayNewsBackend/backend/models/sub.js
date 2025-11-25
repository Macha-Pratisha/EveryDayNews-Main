import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    publication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publication",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "paused", "cancelled"],
      default: "active",
    },
    startDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
