// routes/noteRoutes.js
import express from "express";
import {
  createNote,
  getAllNotes,
  markAsRead,
  deleteNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getAllNotes);
router.patch("/:id/read", markAsRead);
router.delete("/:id", deleteNote);

export default router;
