// controllers/noteController.js
import Note from "../models/Note.js";

// 🟢 Create new note (from Manager)
export const createNote = async (req, res) => {
  try {
    const { message, type } = req.body;

    const note = new Note({
      message,
      type: type || "general",
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
};

// 🟢 Get all notes (for Customer)
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

// 🟢 Mark note as read
export const markAsRead = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error marking note as read", error });
  }
};

// 🟢 Delete a note
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
};
