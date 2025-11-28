import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

// Initialize the API client
// Note: In a production environment, this key should be secured via a backend proxy
// or strict referrer restrictions in the Google Cloud Console.
const apiKey = process.env.API_KEY || 'AIzaSyBKV6TGNOpfrnZILd1yz30NXGLEPJQqED8'; 

const ai = new GoogleGenAI({ apiKey });

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Lower temperature to ensure it follows the "Scan" instruction accurately
        maxOutputTokens: 350,
        tools: [{ googleSearch: {} }] // CRITICAL: Enables "scanning" the website via Google Search
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    
    // Log for leads as requested
    console.log(`[Ceova Lead Tracking] User Query: ${message}`);

    const result: GenerateContentResponse = await chat.sendMessage({ 
      message 
    });

    const text = result.text;
    
    if (!text) {
      throw new Error("No response generated.");
    }
    
    // Check for grounding metadata (URLs found during search) and log them
    // The model will automatically incorporate these links into the text response
    const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (groundingChunks && groundingChunks.length > 0) {
      console.log("Grounding sources found (Scanned Links):", groundingChunks);
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble scanning the site right now! You can check all our samples directly here: https://buildmyceo.odoo.com/shop or book a call with us.";
  }
};

export const resetChat = () => {
  chatSession = null;
};