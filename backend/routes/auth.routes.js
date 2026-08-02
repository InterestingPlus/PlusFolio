// routes/auth.routes.js
import express from "express";
import {
  signUp,
  signIn,
  getCurrentUser,
  signOut,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/me", requireAuth, getCurrentUser);

export default router;
