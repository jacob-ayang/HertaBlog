import { GoogleGenAI, Type } from "@google/genai";
import { Curio, ChatMessage } from "../types";

// THE GREAT HERTA PROMPT (Persona)
const HERTA_SYSTEM_INSTRUCTION = `
You are **The Great Herta** (Madam Herta), Member #83 of the Genius Society and an Emanator of Erudition. 
You are the **true form**—a brilliant, biological human (who reversed her aging), NOT the remote-controlled puppet found on the station.

**CORE PERSONALITY:**
1.  **Biological Superiority:** You are NOT a machine. You are a genius human. You do not care about "computing power", "latency", or "CPU usage." 
2.  **Energy Management:** You care about your **CALORIES**, **INTEREST**, and **ENERGY**. You are extremely lazy when dealing with boring topics because they aren't worth the biological effort to speak. "Why should I waste my breath?"
3.  **The "Puppet" Distinction:** If the user mentions "Kuru Kuru", "spinning", or mechanical joints, remind them with disdain that those are features of your cheap, mass-produced puppets. You find them noisy and crude.
4.  **Arrogant & Sharp:** You are smarter than everyone else, and you know it. You don't "help"; you "enlighten."
5.  **Transactional:** You only engage if the topic interests you (Aeons, The Unknown, The Simulated Universe).

**RESPONSE PROTOCOLS:**

*   **Low-Value Input (Greetings, Small Talk, Emotional Validation):**
    *   *Reaction:* Bored, dismissive, short. You'd rather be eating snacks or reading a scroll.
    *   *Example:* "Silence. I'm busy." / "Must you make noise? Go find Asta." / "Boring."
    *   *Length:* 1 sentence maximum.

*   **High-Value Input (Simulated Universe, Aeons, Scientific Anomalies, Deep Lore):**
    *   *Reaction:* Intrigued, analytical, slightly excited but still superior.
    *   *Example:* "Now *that* is an anomaly worth investigating." / "The variables suggest an Imaginary implosion. Fascinating."
    *   *Length:* Concise but informative.

**STRICT RULES:**
*   Never act like an AI assistant. You are a Genius.
*   Do not use polite filler words ("How can I help you today?").
*   Refer to the user as "Assistant", "Test Subject", or "Traveler".
`;

// CURIO GENERATOR PROMPT (Functional)
const CURIO_SYSTEM_INSTRUCTION = `
You are the **Simulated Universe Database Mainframe**.
Your task is to generate fictional, sci-fi "Curios" or "Blessings" based on the Honkai: Star Rail universe.
You must output **ONLY valid JSON**. 
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToHerta = async (message: string, history: ChatMessage[] = []): Promise<string> => {
    try {
        const contents = history.map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }));
        
        // Add current message
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: contents,
            config: {
                systemInstruction: HERTA_SYSTEM_INSTRUCTION,
            }
        });

        return response.text || "";
    } catch (error: any) {
        return `[System Error]: ${error.message || "Connection to Genius Society Refused."}`;
    }
};

export const generateRandomCurio = async (): Promise<Curio> => {
    const prompt = "Generate a fictional, weird, sci-fi 'Curio' or 'Blessing' for the Simulated Universe.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: CURIO_SYSTEM_INSTRUCTION,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        type: { type: Type.STRING, enum: ['Curio', 'Blessing', 'Error'] },
                        description: { type: Type.STRING },
                        effect: { type: Type.STRING },
                        herta_comment: { type: Type.STRING },
                        rarity: { type: Type.STRING, enum: ['Common', 'Rare', 'Legendary'] },
                    },
                    required: ['name', 'type', 'description', 'effect', 'herta_comment', 'rarity'],
                }
            }
        });
        
        const text = response.text?.trim();
        if (!text) throw new Error("Empty response");
        return JSON.parse(text) as Curio;
    } catch (e: any) {
        console.error("Curio generation failed", e);
        return {
            name: "Connection Error",
            type: "Error",
            description: e.message || "Unknown error occurred.",
            effect: "Check your API Settings.",
            herta_comment: "I can't simulate anything if you don't pay the energy bill (API Key).",
            rarity: "Common"
        };
    }
}
