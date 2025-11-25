import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Manager from "../models/Manager.js";

export const signupManager = async (req, res) => {
  try {
    const { fullName, email, password, branchName } = req.body;
    const documents = req.files ? req.files.map((file) => file.filename) : [];

    const existing = await Manager.findOne({ email });
    if (existing) return res.status(400).json({ message: "Manager already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newManager = await Manager.create({
      fullName,
      email,
      password: hashedPassword,
      branchName,
      documents,
    });

    const token = jwt.sign(
      {
        userId: newManager._id,
        email: newManager.email,
        role: "manager",
        name: newManager.fullName,
        branchName: newManager.branchName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Manager account created successfully",
      token,
      user: {
        userId: newManager._id,
        name: newManager.fullName,
        email: newManager.email,
        role: "manager",
        branchName: newManager.branchName,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;

    const manager = await Manager.findOne({ email });
    if (!manager) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        userId: manager._id,
        email: manager.email,
        role: "manager",
        name: manager.fullName,
        branchName: manager.branchName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: manager._id,
        name: manager.fullName,
        email: manager.email,
        role: "manager",
        branchName: manager.branchName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
