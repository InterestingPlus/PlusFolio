// routes/auth.routes.js
import express from "express";
import passport from "passport";
import {
  signUp,
  signIn,
  getCurrentUser,
  signOut,
  googleAuthCallback,
  linkedinAuthCallback,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/me", requireAuth, getCurrentUser);

// ------------------- GOOGLE OAUTH ROUTES -------------------
// 1. Trigger Google login prompt
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false, // CRITICAL: Disable Express sessions since we use JWT cookies
  }),
);

// 2. Callback url from Google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=GoogleAuthFailed`,
  }),
  googleAuthCallback,
);

// ------------------- LINKEDIN OAUTH ROUTES -------------------
// 1. Trigger LinkedIn login prompt
router.get(
  "/linkedin",
  passport.authenticate("linkedin", {
    scope: ["openid", "profile", "email"],
    session: false, // CRITICAL: Disable Express sessions
  }),
);

// 2. Callback url from LinkedIn
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || "http://localhost:5173"}/login?error=LinkedInAuthFailed`,
  }),
  linkedinAuthCallback,
);

export default router;
