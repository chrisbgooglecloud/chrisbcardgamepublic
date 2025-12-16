import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

try {
  if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client", error);
}

export const generateNarrative = async (context: string, language: string = 'en'): Promise<string> => {
  if (!ai) return "Gemini: *Connection Offline* (Check API Key)";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Gemini, a helpful, sleek, slightly dry-witted AI companion in a game called 'System: Ascension'. 
      The player is Nubus, a cloud engineer cloud. 
      Context: ${context}. 
      Respond in ${language === 'es' ? 'Spanish' : language === 'ja' ? 'Japanese' : 'English'}.
      Keep it short (under 20 words), funny, and related to cloud computing or corporate IT.`,
    });
    return response.text || "...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Gemini: Calculating... (Error)";
  }
};

export const generateCardFlavor = async (cardName: string): Promise<string> => {
  if (!ai) return "Generating flavor text...";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, funny flavor text for a playing card named "${cardName}" in a game about cloud migration. Maximum 12 words. Irony preferred.`,
    });
    return response.text || "Flavor text missing.";
  } catch (error) {
    return "System error: Text not found.";
  }
}