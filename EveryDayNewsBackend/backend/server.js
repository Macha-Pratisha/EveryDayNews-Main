import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";

// Import routes
import managerRoutes from "./routes/managerRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import managerPublicationRoutes from "./routes/managerPublicationsRoutes.js";
import customerPublicationRoutes from "./routes/customerPublicationRoutes.js";
import customerSubscriptionRoutes from "./routes/customerSubscriptionRoutes.js";
import managerNotificationRoutes from "./routes/managerNotificationRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// ------------------ Uploads ------------------
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ------------------ Middleware ------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadDir));

// ------------------ CORS for Vercel frontends ------------------
const allowedOrigins = [
  "https://managerportal.vercel.app",
  "https://customer-portal-black-gamma.vercel.app",
  "https://delivery-portal-iota.vercel.app",
  // Optional local dev
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8082",
  "http://localhost:5173"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

console.log("🌐 CORS enabled for frontend domains");

// ------------------ Serve frontends (main + portals) ------------------
const frontends = [
  { route: "/", dir: "../main-frontend/dist" },
  { route: "/manager", dir: "../Manager-Portal/dist" },
  { route: "/customer", dir: "../Customer-Portal/dist" },
  { route: "/delivery", dir: "../Delivery-Portal/dist" }
];

// ------------------ API Routes ------------------
app.use("/api/manager", managerRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/manager/publications", managerPublicationRoutes);
app.use("/api/customer/publications", customerPublicationRoutes);
app.use("/api/customer/subscriptions", customerSubscriptionRoutes);
app.use("/api/manager/notifications", managerNotificationRoutes);
app.use("/api/customer/bills", billRoutes);
app.use("/api/notes", noteRoutes);

// ------------------ Optional Health Check ------------------
app.get("/api/health", (req, res) => res.json({ status: "ok", timestamp: Date.now() }));

frontends.forEach(({ route, dir }) => {
  const distPath = path.join(__dirname, dir);
  if (fs.existsSync(distPath)) {
    app.use(route, express.static(distPath));
    app.get(new RegExp(`^${route}(/.*)?$`), (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log(`📂 Serving ${route} frontend from ${distPath}`);
  }
});


// ------------------ MongoDB Connection ------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
