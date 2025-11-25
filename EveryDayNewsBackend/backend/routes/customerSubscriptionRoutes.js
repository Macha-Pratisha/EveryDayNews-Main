
// import express from "express";
// import { subscribePublication, getSubscriptions } from "../controllers/subscriptionController.js";

// const router = express.Router();

// // Subscribe to a publication
// router.post("/subscribe", subscribePublication);

// // Get subscriptions for a customer
// router.get("/", getSubscriptions);

// export default router;


import express from "express";
import {
  getSubscriptions,
  subscribePublication,
  updateSubscriptionStatus,
  reportMissingDelivery,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.get("/", getSubscriptions);
router.post("/subscribe", subscribePublication);
router.patch("/:id/:action", updateSubscriptionStatus);
router.post("/report", reportMissingDelivery);

export default router;
