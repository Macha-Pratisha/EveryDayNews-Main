import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import Manager from "../models/Manager.js";

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Signup
router.post("/signup", upload.array("documents"), async (req, res) => {
  try {
    const { fullName, email, password, branchName } = req.body;
    const existing = await Manager.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const documents = req.files.map((file) => file.path);

    const manager = await Manager.create({
      fullName,
      email,
      password: hashedPassword,
      branchName,
      documents,
    });

    const token = jwt.sign(
      { id: manager._id, email, branchName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        managerId: manager._id,
        email,
        branchName,
        fullName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: manager._id, email, branchName: manager.branchName },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        managerId: manager._id,
        email,
        branchName: manager.branchName,
        fullName: manager.fullName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
