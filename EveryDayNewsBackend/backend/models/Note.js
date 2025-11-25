// models/note.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["approval", "payment", "delivery", "general"],
      default: "general",
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
