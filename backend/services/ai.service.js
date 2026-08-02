// services/ai.service.js
import dotenv from "dotenv";
dotenv.config();

const RESUME_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    personal_info: {
      type: "OBJECT",
      properties: {
        name: { type: "STRING" },
        email: { type: "STRING" },
        phone: { type: "STRING" },
        location: { type: "STRING" },
        linkedin: { type: "STRING" },
        website: { type: "STRING" },
      },
      required: ["name", "email", "phone", "location", "linkedin", "website"],
    },
    summary: { type: "STRING" },
    experience: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          job_title: { type: "STRING" },
          company: { type: "STRING" },
          start_date: { type: "STRING" },
          end_date: { type: "STRING" },
          is_current: { type: "BOOLEAN" },
          location: { type: "STRING" },
          description: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
        },
        required: [
          "id",
          "job_title",
          "company",
          "start_date",
          "end_date",
          "is_current",
          "location",
          "description",
        ],
      },
    },
    education: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          degree: { type: "STRING" },
          institution: { type: "STRING" },
          start_date: { type: "STRING" },
          end_date: { type: "STRING" },
          gpa: { type: "STRING" },
        },
        required: [
          "id",
          "degree",
          "institution",
          "start_date",
          "end_date",
          "gpa",
        ],
      },
    },
    skills: {
      type: "ARRAY",
      items: { type: "STRING" },
    },
    projects: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          name: { type: "STRING" },
          description: { type: "STRING" },
          technologies: {
            type: "ARRAY",
            items: { type: "STRING" },
          },
        },
        required: ["id", "name", "description", "technologies"],
      },
    },
  },
  required: [
    "personal_info",
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
  ],
};

// Helper: sleep function for brief retry delays
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const GetAIParsedResume = async (rawInput) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }

    const prompt = `You are a professional resume parser and writer. Extract structured resume data from the input text.
    
Rules:
- Extract all information accurately from the input paragraph.
- For experience descriptions, write 2-4 professional, action-oriented, quantifiable ATS-friendly bullet points.
- Sort skills alphabetically.
- If any field is missing from the input, return an empty string "" or empty array [].
- Generate unique IDs (e.g., "exp_1", "edu_1", "proj_1") for each array item.

Input paragraph:
"${rawInput}"`;

    // Production Fallback Chain: Try primary model first; if rate-limited (429), fall back to lighter models
    const MODEL_CHAIN = [
      "gemini-2.0-flash",
      "gemini-flash-lite-latest",
      "gemini-2.5-flash-lite",
    ];

    let lastError = null;

    for (const modelName of MODEL_CHAIN) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 8192,
              responseMimeType: "application/json",
              responseSchema: RESUME_RESPONSE_SCHEMA,
            },
          }),
        });

        // If rate limited (429) or model busy (503), log warning and try next model in chain
        if (response.status === 429 || response.status === 503) {
          console.warn(
            `[AI Warning] Model ${modelName} returned ${response.status}. Switching to fallback...`,
          );
          await sleep(2000); // 2-second pause before trying fallback
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Model ${modelName} failed (${response.status}): ${errorText}`,
          );
        }

        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (!rawText) {
          throw new Error(`Model ${modelName} returned empty text.`);
        }

        // Successfully parsed from one of the models in the chain
        const parsedData = JSON.parse(rawText);
        return { ok: true, data: parsedData };
      } catch (modelError) {
        lastError = modelError;
        console.warn(`[AI Fallback] ${modelName} failed:`, modelError.message);
      }
    }

    // If all models in the chain failed
    return {
      ok: false,
      error:
        lastError?.message ||
        "All AI fallback models are currently exhausted or unavailable.",
    };
  } catch (error) {
    console.error("GetAIParsedResume Fatal Error:", error);
    return {
      ok: false,
      error: error.message || "Failed to parse resume data.",
    };
  }
};
