import jwt from "jsonwebtoken";
import Manager from "../models/Manager.js";
import Customer from "../models/Customer.js";
import DeliveryPerson from "../models/DeliveryPerson.js";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Find user in all collections
    let user =
      (await Manager.findById(userId).select("-password")) ||
      (await Customer.findById(userId).select("-password")) ||
      (await DeliveryPerson.findById(userId).select("-password"));

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
