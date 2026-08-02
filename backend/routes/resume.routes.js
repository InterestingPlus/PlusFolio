// routes/resume.routes.js
import express from "express";
import {
  generateAIResume,
  createManualResume,
  getResumeById,
  getAllResumes,
  updateResumeById,
  deleteResumeById,
} from "../controllers/resume.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

// Apply requireAuth to all routes in this router
router.use(requireAuth);

router.get("/", getAllResumes);
router.post("/generate-ai", generateAIResume);
router.post("/", createManualResume);
router.get("/:id", getResumeById);
router.put("/:id", updateResumeById);
router.delete("/:id", deleteResumeById);

export default router;
