// import Publication from "../models/Publication.js";

// // ✅ Create Publication
// export const createPublication = async (req, res) => {
//   try {
//     const { name, language, monthlyPrice } = req.body;
//     const publication = new Publication({
//       name,
//       language,
//       monthlyPrice,
//       createdBy: req.user?._id || null,
//     });
//     await publication.save();
//     res.status(201).json(publication);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create publication", error: error.message });
//   }
// };

// // ✅ Get All Publications
// export const getAllPublications = async (req, res) => {
//   try {
//     const publications = await Publication.find().sort({ createdAt: -1 });
//     res.status(200).json(publications);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch publications", error: error.message });
//   }
// };

// // ✅ Update Publication
// export const updatePublication = async (req, res) => {
//   try {
//     const publication = await Publication.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!publication) return res.status(404).json({ message: "Publication not found" });
//     res.status(200).json(publication);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update publication", error: error.message });
//   }
// };

// // ✅ Delete Publication
// export const deletePublication = async (req, res) => {
//   try {
//     const publication = await Publication.findByIdAndDelete(req.params.id);
//     if (!publication) return res.status(404).json({ message: "Publication not found" });
//     res.status(200).json({ message: "Publication deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete publication", error: error.message });
//   }
// };

// import Publication from "../models/Publication.js";

// // 🟢 Create new publication
// export const createPublication = async (req, res) => {
//   try {
//     const { name, language, monthlyPrice } = req.body;

//     if (!name || !language || !monthlyPrice) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const publication = new Publication({
//       name,
//       language,
//       monthlyPrice,
//       active: true,
//     });

//     await publication.save();
//     res.status(201).json(publication);
//   } catch (error) {
//     console.error("❌ Error creating publication:", error);
//     res.status(500).json({ message: "Failed to save publication", error: error.message });
//   }
// };

// // 🟢 Get all publications
// export const getAllPublications = async (req, res) => {
//   try {
//     const publications = await Publication.find();
//     res.status(200).json(publications);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch publications" });
//   }
// };

// // 🟢 Update publication
// export const updatePublication = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, language, monthlyPrice } = req.body;

//     const updated = await Publication.findByIdAndUpdate(
//       id,
//       { name, language, monthlyPrice },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "Publication not found" });

//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update publication" });
//   }
// };

// // 🟢 Delete publication
// export const deletePublication = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Publication.findByIdAndDelete(id);

//     if (!deleted) return res.status(404).json({ message: "Publication not found" });

//     res.json({ message: "Publication deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete publication" });
//   }
// };


// import Publication from '../models/Publication.js';

// // ✅ Get all
// export const getAllPublications = async (req, res) => {
//   try {
//     const publications = await Publication.find();
//     res.json(publications);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching publications', error: err });
//   }
// };

// // ✅ Create
// export const createPublication = async (req, res) => {
//   try {
//     const { name, language, monthlyPrice } = req.body;
//     const publication = new Publication({ name, language, monthlyPrice, active: true });
//     await publication.save();
//     res.status(201).json(publication);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating publication', error: err });
//   }
// };

// // ✅ Update
// export const updatePublication = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await Publication.findByIdAndUpdate(id, req.body, { new: true });

//     if (!updated) return res.status(404).json({ message: 'Publication not found' });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating publication', error: err });
//   }
// };

// // ✅ Delete
// export const deletePublication = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Publication.findByIdAndDelete(id);

//     if (!deleted) return res.status(404).json({ message: 'Publication not found' });

//     res.json({ message: 'Publication deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting publication', error: err });
//   }
// };

import Publication from "../models/Publication.js";

export const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching publications", error });
  }
};

export const createPublication = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("Field types:", {
      name: typeof req.body.name,
      language: typeof req.body.language,
      monthlyPrice: typeof req.body.monthlyPrice,
    });

    const { name, language, monthlyPrice } = req.body;

    if (!name || !language || monthlyPrice === undefined || isNaN(monthlyPrice)) {
      console.log("Validation failed:", { name, language, monthlyPrice });
      return res.status(400).json({ message: "Invalid input" });
    }

    const publication = new Publication({
      name,
      language,
      monthlyPrice,
      active: true,
    });

    const saved = await publication.save();
    console.log("Saved publication:", saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating publication:", error);
    res.status(500).json({ message: "Error creating publication", error });
  }
};


export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Publication.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Publication not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating publication", error });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting publication with ID:", id); // ✅ Debug log

    const deleted = await Publication.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error("Delete publication error:", error);
    res.status(500).json({ message: "Error deleting publication", error });
  }
};
