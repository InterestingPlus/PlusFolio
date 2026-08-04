// Function to list all available Generative AI models for your API Key
export const listAvailableGeminiModels = async () => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }

    // Call ModelService.ListModels endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `Failed to fetch models (${response.status}): ${JSON.stringify(data)}`,
      );
    }

    // Filter only those models that support 'generateContent'
    const validModels = data.models
      ?.filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => {
        // Strip out the "models/" prefix so we get clean names like "gemini-2.0-flash"
        return m.name.replace("models/", "");
      });

    console.log("=========================================");
    console.log("AVAILABLE MODELS FOR GENERATE CONTENT:");
    console.log("=========================================");
    console.log(JSON.stringify(validModels, null, 2));
    console.log("=========================================");

    return { ok: true, models: validModels };
  } catch (error) {
    console.error("Error listing Gemini models:", error.message);
    return { ok: false, error: error.message };
  }
};
