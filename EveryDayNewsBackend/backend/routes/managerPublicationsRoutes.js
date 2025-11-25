// import express from "express";
// import {
//   createPublication,
//   getAllPublications,
//   updatePublication,
//   deletePublication,
// } from "../controllers/publicationController.js";

// const router = express.Router();

// // Manager routes
// router.post("/manager/publications", createPublication);
// router.get("/manager/publications", getAllPublications);
// router.put("/manager/publications/:id", updatePublication);
// router.delete("/manager/publications/:id", deletePublication);

// // Customer route (view only)
// router.get("/customer/publications", getAllPublications);

// export default router;


// import express from "express";
// import {
//   createPublication,
//   getAllPublications,
//   updatePublication,
//   deletePublication,
// } from "../controllers/publicationController.js";

// const router = express.Router();

// // GET all publications (for manager)
// router.get("/", getAllPublications);

// // POST new publication
// router.post("/", createPublication);

// // PUT update publication
// router.put("/:id", updatePublication);

// // DELETE publication
// router.delete("/:id", deletePublication);

// export default router;

import express from "express";
import {
  createPublication,
  getAllPublications,
  updatePublication,
  deletePublication,
} from "../controllers/publicationController.js";

const router = express.Router();

// Correct routes — no prefix needed, prefix comes from server.js
router.post("/", createPublication);
router.get("/", getAllPublications);
router.put("/:id", updatePublication);
router.delete("/:id", deletePublication);

export default router;




