import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  branchName: { type: String, required: true },
  documents: [String], // store uploaded file paths or URLs
}, { timestamps: true });

export default mongoose.model("Manager", managerSchema);
