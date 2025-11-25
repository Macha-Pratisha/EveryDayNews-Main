import express from "express";
import { getCustomerBills } from "../controllers/billController.js";

const router = express.Router();

router.get("/", getCustomerBills);

export default router;
