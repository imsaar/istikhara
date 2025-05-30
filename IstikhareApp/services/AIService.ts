import NetInfo from '@react-native-community/netinfo';
import { AIAnalysis } from '../types';

class AIService {
  private apiKey: string | null = null;

  setApiKey(key: string): void {
    this.apiKey = key;
  }

  async checkNetworkConnection(): Promise<boolean> {
    const netInfo = await NetInfo.fetch();
    return netInfo.isConnected === true;
  }

  async performAnalysis(englishVerse: string): Promise<AIAnalysis> {
    if (!this.apiKey) {
      throw new Error('API key not configured. Please set your Gemini API key.');
    }

    const isConnected = await this.checkNetworkConnection();
    if (!isConnected) {
      throw new Error('No internet connection. AI analysis requires internet connectivity.');
    }

    const prompt = `Analyze the following English translation of a Quran verse and provide a verdict and a brief analysis.
    The verdict must be one of "Good", "Not Good", or "Neutral".
    - Verdict "Not Good": If the verse is primarily about wrath, chastisement, punishment, warnings against wrongdoing, or the displeasure of Allah.
    - Verdict "Good": If the verse is primarily about glad tidings, reward, encouragement, positive outcomes, mercy, forgiveness, or bounties from Allah.
    - Verdict "Neutral": If the verse is neither predominantly "Good" nor "Not Good", or if it's primarily narrative, legislative, or descriptive without a strong positive or negative emotional charge.
    Provide the analysis explaining your reasoning for the verdict.

    Verse: "${englishVerse}"`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            analysis: { type: "STRING", description: "Brief analysis explaining the verdict." },
            verdict: {
              type: "STRING",
              enum: ["Good", "Not Good", "Neutral"],
              description: "The overall verdict for the verse."
            }
          },
          required: ["analysis", "verdict"]
        }
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        
        const aiResponseText = result.candidates[0].content.parts[0].text;
        const aiData = JSON.parse(aiResponseText);

        return {
          verdict: aiData.verdict || 'Neutral',
          analysis: aiData.analysis || 'No analysis provided.'
        };
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error("Could not parse AI response. Unexpected structure.");
      }
    } catch (error) {
      console.error("Error fetching or processing AI analysis:", error);
      throw error;
    }
  }
}

export default new AIService();