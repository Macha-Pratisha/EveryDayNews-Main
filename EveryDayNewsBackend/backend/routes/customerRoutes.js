import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

// Register
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const customer = new Customer({ name, email, password: hashed });
    await customer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
// ✅ Example: customer login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(400).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: customer._id, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        userId: customer._id, // ✅ ADD THIS
        name: customer.name,
        email: customer.email,
        role: "customer",     // ✅ optional but helpful
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Profile
router.patch("/profile", verifyToken, async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.user.id, req.body, { new: true }).select("-password");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
