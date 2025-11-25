// routes/customerPublicationRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllPublications } from "../controllers/publicationController.js";

const router = express.Router();

// Customers can view all publications (no role check now)
router.get("/", getAllPublications);

export default router;
