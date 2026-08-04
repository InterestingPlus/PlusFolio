// server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import job from "./config/cron.js";
import passport from "./config/passport.js";

dotenv.config();

const app = express();
job.start();

app.use(passport.initialize());

// CRITICAL PRODUCTION CORS SETTINGS FOR COOKIES
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Must match your React app's origin exactly
    credentials: true, // Required to allow cookies across origins
  }),
);

app.use(express.json());
app.use(cookieParser());

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
