// controllers/resume.controller.js
import crypto from "crypto";
import { GoogleSheetService } from "../utils/GoogleSheets.js";
import { SheetsConfig } from "../models/sheets.js";
import { GetAIParsedResume } from "../services/ai.service.js";

const sheetService = new GoogleSheetService();

// Helper: Safely parse JSON strings from Google Sheets cells back into objects
const parseResumeRow = (row) => {
  if (!row) return null;
  const jsonFields = [
    "personal_info",
    "experience",
    "education",
    "skills",
    "projects",
  ];

  const parsed = { ...row };
  jsonFields.forEach((field) => {
    if (typeof parsed[field] === "string") {
      try {
        parsed[field] = JSON.parse(parsed[field]);
      } catch (e) {
        parsed[field] = field === "personal_info" ? {} : [];
      }
    }
  });

  parsed.ai_generated =
    parsed.ai_generated === "true" || parsed.ai_generated === true;
  return parsed;
};

/**
 * @desc   Generate structured resume using AI and save to Google Sheets
 * @route  POST /api/resumes/generate-ai
 */
export const generateAIResume = async (req, res) => {
  try {
    const { title, rawInput } = req.body;
    const userId = req.user.id; // From requireAuth middleware

    if (!title || !rawInput || typeof rawInput !== "string") {
      return res.status(400).json({
        error: "Title and raw input are required.",
      });
    }

    // 1. Proxy call to your AI parsing service securely from the backend

    const result = await GetAIParsedResume(rawInput);

    if (!result.ok || result?.error) {
      throw new Error(result?.error || "AI generation service failed");
    }

    const aiData = result.data || {};

    // 2. Prepare structured data object
    const newResumeObj = {
      id: crypto.randomUUID(),
      user_id: userId,
      title: title.trim(),
      raw_input: rawInput,
      personal_info: JSON.stringify(
        aiData.personal_info || {
          name: "",
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          website: "",
        },
      ),
      summary: aiData.summary || "",
      experience: JSON.stringify(aiData.experience || []),
      education: JSON.stringify(aiData.education || []),
      skills: JSON.stringify(aiData.skills || []),
      projects: JSON.stringify(aiData.projects || []),
      template: "modern",
      ai_generated: "true",
      created_at: new Date().toISOString(),
    };

    // 3. Order row values to match SheetsConfig.resumes.columns
    const rowValues = SheetsConfig.resumes.columns.map(
      (col) => newResumeObj[col] ?? "",
    );

    // 4. Save to Google Sheets
    const inserted = await sheetService.insert("resumes", rowValues);
    const formattedResume = parseResumeRow(inserted);

    return res.status(201).json({ resume: formattedResume });
  } catch (error) {
    console.error("Generate AI Resume Error:", error);
    return res.status(500).json({
      message: error?.message || "Failed to generate AI resume.",
    });
  }
};

/**
 * @desc   Create a manual/blank resume in Google Sheets
 * @route  POST /api/resumes
 */
export const createManualResume = async (req, res) => {
  try {
    const { title, rawInput } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({ message: "Resume title is required." });
    }

    const newResumeObj = {
      id: crypto.randomUUID(),
      user_id: userId,
      title: title.trim(),
      raw_input: rawInput || "",
      personal_info: JSON.stringify({
        name: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
      }),
      summary: "",
      experience: JSON.stringify([]),
      education: JSON.stringify([]),
      skills: JSON.stringify([]),
      projects: JSON.stringify([]),
      template: "modern",
      ai_generated: "false",
      created_at: new Date().toISOString(),
    };

    const rowValues = SheetsConfig.resumes.columns.map(
      (col) => newResumeObj[col] ?? "",
    );

    const inserted = await sheetService.insert("resumes", rowValues);
    const formattedResume = parseResumeRow(inserted);

    return res.status(201).json({ resume: formattedResume });
  } catch (error) {
    console.error("Create Manual Resume Error:", error);
    return res.status(500).json({ message: "Failed to create manual resume." });
  }
};

/**
 * @desc   Get single resume by ID (Protected by User ID ownership)
 * @route  GET /api/resumes/:id
 */
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const row = await sheetService.findById("resumes", id);

    if (!row || Array.isArray(row)) {
      return res.status(404).json({ message: "Resume not found." });
    }

    // Security standard: Ensure user owns this resume
    if (row.user_id !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to resume." });
    }

    return res.status(200).json({ resume: parseResumeRow(row) });
  } catch (error) {
    console.error("Get Resume Error:", error);
    return res.status(500).json({ message: "Failed to fetch resume." });
  }
};

/**
 * @desc   Get all resumes belonging to authenticated user
 * @route  GET /api/resumes
 */
export const getAllResumes = async (req, res) => {
  try {
    const userId = req.user.id;
    const allRows = await sheetService.read("resumes");

    // Filter by ownership and sort by created_at / updated_at descending
    const userResumes = allRows
      .filter((row) => row.user_id === userId)
      .map(parseResumeRow)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.status(200).json({ resumes: userResumes });
  } catch (error) {
    console.error("Get All Resumes Error:", error);
    return res.status(500).json({ message: "Failed to fetch resumes." });
  }
};

/**
 * @desc   Update resume fields by ID (Protected by User ID ownership)
 * @route  PUT /api/resumes/:id
 */
export const updateResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updates = req.body;

    // 1. Fetch existing resume row
    const existingRow = await sheetService.findById("resumes", id);

    if (!existingRow || Array.isArray(existingRow)) {
      return res.status(404).json({ message: "Resume not found." });
    }

    // 2. Ensure ownership
    if (existingRow.user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized update attempt." });
    }

    // 3. Merge updates and ensure JSON fields are stringified for Google Sheets
    const merged = { ...existingRow, ...updates };

    const jsonFields = [
      "personal_info",
      "experience",
      "education",
      "skills",
      "projects",
    ];
    jsonFields.forEach((field) => {
      if (merged[field] !== undefined && typeof merged[field] !== "string") {
        merged[field] = JSON.stringify(merged[field]);
      }
    });

    if (merged.ai_generated !== undefined) {
      merged.ai_generated = String(merged.ai_generated);
    }

    // 4. Order columns strictly according to SheetsConfig.resumes.columns
    const rowValues = SheetsConfig.resumes.columns.map(
      (col) => merged[col] ?? "",
    );

    // Remove the primary key (id at index 0) from the payload passed to updateById
    const updatePayload = rowValues.slice(1);

    // 5. Update row in Google Sheets
    const updatedRow = await sheetService.updateById(
      "resumes",
      id,
      updatePayload,
    );

    return res.status(200).json({ resume: parseResumeRow(updatedRow) });
  } catch (error) {
    console.error("Update Resume Error:", error);
    return res.status(500).json({ message: "Failed to update resume." });
  }
};

/**
 * @desc   Delete resume by ID (Protected by User ID ownership)
 * @route  DELETE /api/resumes/:id
 */
export const deleteResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // 1. Get all rows to locate row index
    const allRows = await sheetService.read("resumes");
    const rowIndex = allRows.findIndex((row) => row.id === id);

    if (rowIndex === -1) {
      return res.status(404).json({ message: "Resume not found." });
    }

    const rowToDelete = allRows[rowIndex];
    if (rowToDelete.user_id !== userId) {
      return res.status(403).json({ message: "Unauthorized delete attempt." });
    }

    // 2. Google Sheets row index is 1-based header + 1-based index (slice(1) array offset = +2)
    const sheetRowIndex = rowIndex + 2;

    await sheetService.deleteRow("resumes", sheetRowIndex);

    return res.status(200).json({ message: "Resume deleted successfully." });
  } catch (error) {
    console.error("Delete Resume Error:", error);
    return res.status(500).json({ message: "Failed to delete resume." });
  }
};
