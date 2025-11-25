import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import DeliveryPerson from '../models/DeliveryPerson.js';
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route POST /api/delivery/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, vehicleNumber, area, role } = req.body;

    const existingUser = await DeliveryPerson.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const deliveryPerson = await DeliveryPerson.create({
      name,
      email,
      password,
      phone,
      vehicleNumber,
      area,
      role: role || 'delivery',
    });

    res.status(201).json({
      deliveryPersonId: deliveryPerson._id,
      name: deliveryPerson.name,
      email: deliveryPerson.email,
      role: deliveryPerson.role,
      branchName: deliveryPerson.branchName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/delivery/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const deliveryPerson = await DeliveryPerson.findOne({ email });

    if (!deliveryPerson) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await deliveryPerson.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(deliveryPerson._id);

    res.json({
      token,
      deliveryPersonId: deliveryPerson._id,
      name: deliveryPerson.name,
      email: deliveryPerson.email,
      role: deliveryPerson.role,
      branchName: deliveryPerson.branchName,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/delivery/me (protected)
router.get("/me", verifyToken, async (req, res) => {
  res.json(req.user);
});


export default router;
