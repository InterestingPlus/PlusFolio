// server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();
job.start();

// CRITICAL PRODUCTION CORS SETTINGS FOR COOKIES
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Must match your React app's origin exactly
    credentials: true, // Required to allow cookies across origins
  }),
);

app.use(express.json());
app.use(cookieParser());

// async function listAvailableModels() {
//   const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     console.log("=== Supported Models for generateContent ===");
//     const validModels = (data.models || []).filter((m) =>
//       m.supportedGenerationMethods?.includes("generateContent"),
//     );

//     validModels.forEach((m) => {
//       // Strips "models/" prefix so you see the exact string to use
//       console.log("->", m.name.replace("models/", ""));
//     });
//   } catch (err) {
//     console.error("Failed to fetch models:", err.message);
//   }
// }

// listAvailableModels();

// Auth routes
app.use("/api/auth", authRoutes);
// Resume routes
app.use("/api/resumes", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
  );
});
