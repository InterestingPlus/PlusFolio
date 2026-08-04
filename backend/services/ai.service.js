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

// const MODEL_CHAIN = [
//   "gemini-2.5-flash",
//   "gemini-2.5-pro",
//   "gemini-2.0-flash",
//   "gemini-2.0-flash-001",
//   "gemini-2.0-flash-lite-001",
//   "gemini-2.0-flash-lite",
//   "gemini-2.5-flash-preview-tts",
//   "gemini-2.5-pro-preview-tts",
//   "gemma-4-26b-a4b-it",
//   "gemma-4-31b-it",
//   "gemini-flash-latest",
//   "gemini-flash-lite-latest",
//   "gemini-pro-latest",
//   "gemini-2.5-flash-lite",
//   "gemini-2.5-flash-image",
//   "gemini-3-pro-preview",
//   "gemini-3-flash-preview",
//   "gemini-3.1-pro-preview",
//   "gemini-3.1-pro-preview-customtools",
//   "gemini-3.1-flash-lite-preview",
//   "gemini-3.1-flash-lite",
//   "gemini-3-pro-image-preview",
//   "gemini-3-pro-image",
//   "nano-banana-pro-preview",
//   "gemini-3.1-flash-image-preview",
//   "gemini-3.1-flash-image",
//   "gemini-3.1-flash-lite-image",
//   "gemini-3.5-flash",
//   "gemini-3.5-flash-lite",
//   "gemini-omni-flash-preview",
//   "gemini-3.6-flash",
//   "lyria-3-clip-preview",
//   "lyria-3-pro-preview",
//   "gemini-3.1-flash-tts-preview",
//   "gemini-robotics-er-1.5-preview",
//   "gemini-robotics-er-1.6-preview",
//   "gemini-robotics-er-2-preview",
//   "gemini-2.5-computer-use-preview-10-2025",
//   "antigravity-preview-05-2026",
//   "deep-research-max-preview-04-2026",
//   "deep-research-preview-04-2026",
//   "deep-research-pro-preview-12-2025",
// ];

const MODEL_CHAIN = [
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-001",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash-lite-001",

  "gemini-flash-latest",

  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",

  "gemini-3.6-flash",

  "gemini-3-pro-preview",
  "gemini-3.1-pro-preview",

  "gemini-3-flash-preview",
  "gemini-3.1-flash-lite",
  "gemini-3.1-flash-lite-preview",
];

// im the full stack developer with 0 years of production experience, means im fresher! but i have build 1-2 projects like: library management system using php and mysql, and second is a reciepe app with react native and mealdb api! and i have completed my bca with mkbu university! this year.

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

    // Production Fallback Chain: Valid, active Gemini model identifiers

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

        // 1. Handle Rate Limit (429) & Busy (503) -> Pause then skip
        if (response.status === 429 || response.status === 503) {
          console.warn(
            `[AI Warning] Model ${modelName} returned ${response.status}. Switching to fallback...`,
          );
          await sleep(2000); // 2-second pause before trying next fallback
          continue;
        }

        // 2. Handle Deprecated / Not Found (404 / 400) -> Skip immediately
        if (response.status === 404 || response.status === 400) {
          const errorText = await response.text();
          console.warn(
            `[AI Warning] Model ${modelName} unavailable (${response.status}): Skipping to next model...`,
          );
          lastError = new Error(
            `Model ${modelName} (${response.status}): ${errorText}`,
          );
          continue;
        }

        // 3. For any other unhandled HTTP errors, throw to outer catch
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
