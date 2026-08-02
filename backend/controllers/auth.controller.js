// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { GoogleSheetService } from "../utils/GoogleSheets.js";
import { SheetsConfig } from "../config/sheets.js";

const sheetService = new GoogleSheetService();

// Helper to sanitize user object (remove password hash)
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

// Helper to generate and set JWT HTTP-only cookie
const setAuthCookie = (res, user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }, // 30 days taaki baar-baar expire na ho
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    // Cross-domain (e.g., Vercel frontend -> Render backend) ke liye:
    // Production me secure: true aur sameSite: "none" HONA HI CHAHIYE
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days in milliseconds
    path: "/", // Ensure cookie is sent to all API routes
  });
};
/**
 * @desc   Register a new user
 * @route  POST /api/auth/signup
 */
export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, password, and name are required." });
    }

    // 1. Check if user already exists
    const allUsers = await sheetService.read("users");
    const existingUser = allUsers.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase(),
    );

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Prepare row values in the EXACT order of SheetsConfig.users.columns
    const newUserObj = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name,
      created_at: new Date().toISOString(),
    };

    const rowValues = SheetsConfig.users.columns.map(
      (col) => newUserObj[col] ?? null,
    );

    // 4. Insert row into Google Sheets
    const createdUser = await sheetService.insert("users", rowValues);

    // 5. Issue session cookie
    const safeUser = sanitizeUser(createdUser);
    setAuthCookie(res, safeUser);

    return res.status(201).json({ user: safeUser });
  } catch (error) {
    console.error("SignUp Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during registration." });
  }
};

/**
 * @desc   Authenticate user and issue session
 * @route  POST /api/auth/signin
 */
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // 1. Find user by email
    const allUsers = await sheetService.read("users");

    console.log(allUsers);
    const user = allUsers.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 2. Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 3. Issue session cookie
    const safeUser = sanitizeUser(user);
    setAuthCookie(res, safeUser);

    return res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error("SignIn Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error during login." });
  }
};

/**
 * @desc   Get currently authenticated user
 * @route  GET /api/auth/me
 */
export const getCurrentUser = async (req, res) => {
  try {
    const { id } = req.user; // populated by requireAuth middleware

    const user = await sheetService.findById("users", id);

    // findById returns [] if not found in your implementation
    if (!user || Array.isArray(user)) {
      return res
        .status(401)
        .json({ message: "User account no longer exists." });
    }

    const safeUser = sanitizeUser(user);
    return res.status(200).json({ user: safeUser });
  } catch (error) {
    console.error("GetCurrentUser Error:", error);
    return res.status(500).json({ message: "Failed to fetch user session." });
  }
};

/**
 * @desc   Sign out user by clearing cookie
 * @route  POST /api/auth/signout
 */
export const signOut = async (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  });

  return res.status(200).json({ message: "Successfully signed out." });
};
