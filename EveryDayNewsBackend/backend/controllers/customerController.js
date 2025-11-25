import Customer from "../models/Customer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signupCustomer = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    const token = jwt.sign(
  { userId: customer._id, email: customer.email, role: "customer" , name: customer.name},
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


   res.status(201).json({
  message: "Account created successfully",
  token,
  user: {
    userId: customer._id,
    name: customer.name,
    email: customer.email,
    role: "customer",
  },
});

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
