import express from "express";
import {
  createSubscription,
  getSubscriptions,
  updateStatus,
} from "../controllers/subCont.js";

const router = express.Router();

// POST - after payment
router.post("/", createSubscription);

// GET - customer’s subscriptions
router.get("/:customerId", getSubscriptions);

// PATCH - change subscription status
router.patch("/:id/:action", updateStatus);

export default router;
