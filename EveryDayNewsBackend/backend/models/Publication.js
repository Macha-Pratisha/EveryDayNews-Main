import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    language: { type: String, required: true },
    monthlyPrice: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Publication", publicationSchema);
