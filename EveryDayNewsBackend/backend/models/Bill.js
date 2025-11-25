import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  subscriptionName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["paid", "pending", "overdue"], default: "pending" },
  paidDate: { type: Date },
  receiptUrl: { type: String },
});

export default mongoose.model("Bill", billSchema);
