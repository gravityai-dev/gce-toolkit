/**
 * Gemini API Credentials
 */

export const GeminiCredential = {
  name: "geminiCredential",
  type: "object",
  title: "Google Gemini API Credentials",
  properties: {
    apiKey: {
      type: "string",
      title: "API Key",
      description: "Your Google Gemini API key",
    },
  },
  required: ["apiKey"],
};
