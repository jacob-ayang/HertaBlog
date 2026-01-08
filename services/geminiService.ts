import { Curio, ChatSettings, ChatMessage } from "../types";

// DEFAULT SETTINGS
const DEFAULT_SETTINGS: ChatSettings = {
    endpoint: "https://api.openai.com/v1", // Default to OpenAI, compatible with DeepSeek/Zeabur/Local
    apiKey: "", 
    model: "gpt-4o" // Default placeholder
};

// STORAGE KEYS
const STORAGE_KEY = 'herta_terminal_config';

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
Do not include markdown formatting like \`\`\`json. 
Just return the raw JSON object.
`;

export const getSettings = (): ChatSettings => {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
};

export const saveSettings = (settings: ChatSettings) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

// Generic OpenAI-Compatible Completion
const callCompletion = async (messages: any[], settings: ChatSettings, jsonMode: boolean = false, systemPrompt: string = HERTA_SYSTEM_INSTRUCTION): Promise<string> => {
    if (!settings.apiKey) {
        throw new Error("API Key missing. Please configure it in the settings.");
    }

    // Simple URL Handling: Always append /chat/completions if not present
    let url = settings.endpoint.trim().replace(/\/$/, "");
    if (!url.endsWith('/chat/completions')) {
         url = url + "/chat/completions";
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${settings.apiKey}`
    };

    const body: any = {
        model: settings.model,
        messages: [
            { role: "system", content: systemPrompt },
            ...messages
        ],
        temperature: 0.7,
        max_tokens: 500,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API Error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "";
    } catch (error) {
        console.error("LLM Call Failed:", error);
        throw error;
    }
};

export const sendMessageToHerta = async (message: string, history: ChatMessage[] = []): Promise<string> => {
    const settings = getSettings();
    
    // Convert internal history to OpenAI format
    const contextMessages = history.slice(-6).map(m => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.text
    }));

    // Add current message
    contextMessages.push({ role: 'user', content: message });

    try {
        return await callCompletion(contextMessages, settings, false, HERTA_SYSTEM_INSTRUCTION);
    } catch (error: any) {
        return `[System Error]: ${error.message || "Connection to Genius Society Refused."}`;
    }
};

// Helper function to robustly extract JSON from a string
const extractJSON = (text: string): any => {
    try {
        // 1. Try direct parse
        return JSON.parse(text);
    } catch (e) {
        // 2. Try finding { and } to isolate the object
        const firstOpen = text.indexOf('{');
        const lastClose = text.lastIndexOf('}');
        
        if (firstOpen !== -1 && lastClose !== -1 && lastClose > firstOpen) {
            const jsonStr = text.substring(firstOpen, lastClose + 1);
            try {
                return JSON.parse(jsonStr);
            } catch (e2) {
                console.error("Failed to parse extracted JSON substring", e2);
            }
        }
        
        // 3. Fallback: Try removing markdown code blocks if simple extraction failed
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        try {
            return JSON.parse(cleanText);
        } catch (e3) {
            console.error("Failed to parse cleaned JSON", e3);
        }
        
        throw new Error("Response did not contain valid JSON");
    }
};

export const generateRandomCurio = async (): Promise<Curio> => {
    const settings = getSettings();
    
    const prompt = "Generate a fictional, weird, sci-fi 'Curio' or 'Blessing' for the Simulated Universe. Return ONLY valid JSON with keys: name, type (Curio/Blessing), description, effect, herta_comment (Must be sarcastic, short, and signed by Herta), rarity (Common/Rare/Legendary). Do not use markdown.";

    try {
        const responseText = await callCompletion(
            [{ role: 'user', content: prompt }], 
            settings, 
            true, 
            CURIO_SYSTEM_INSTRUCTION
        );
        
        return extractJSON(responseText) as Curio;
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