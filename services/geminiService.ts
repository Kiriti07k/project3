
import { GoogleGenAI, Type } from "@google/genai";
import { MutualFund } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateFundAnalysis = async (fund: MutualFund): Promise<string> => {
  try {
    const prompt = `Provide a detailed investment analysis for the mutual fund "${fund.name} (${fund.symbol})". Cover the following aspects in a concise manner:
    1.  **Investment Strategy:** What is its core investment strategy and what does it track or focus on?
    2.  **Risk Profile:** Based on its category ("${fund.category}") and risk level ("${fund.riskLevel}"), what are the primary risks investors should be aware of?
    3.  **Ideal Investor:** What type of investor is this fund most suitable for (e.g., long-term growth, capital preservation, income)?
    
    Format the output as clean markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating fund analysis:", error);
    return "An error occurred while generating the fund analysis. Please try again later.";
  }
};

export const generateMarketTrendAnalysis = async (): Promise<string> => {
    try {
        const prompt = `Generate a summary of current market trends relevant to mutual fund investors. Cover:
        1. Overall market sentiment (e.g., bullish, bearish, neutral).
        2. Key performing sectors.
        3. Potential headwinds and tailwinds for the next quarter.

        Format the output as clean markdown with clear headings.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              tools: [{googleSearch: {}}]
            }
        });

        let analysisText = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if(groundingChunks && groundingChunks.length > 0) {
            analysisText += "\n\n**Sources:**\n";
            groundingChunks.forEach((chunk: any) => {
                if (chunk.web) {
                    analysisText += `* [${chunk.web.title}](${chunk.web.uri})\n`;
                }
            });
        }
        return analysisText;
    } catch (error) {
        console.error("Error generating market trend analysis:", error);
        return "Failed to generate market trend analysis.";
    }
};

export const generateEducationalArticle = async (topic: string): Promise<string> => {
    try {
        const prompt = `Write a clear and concise educational article for a novice investor on the topic: "${topic}".
        Explain the concept, its importance in investing, and provide a simple example. Keep the tone encouraging and easy to understand.
        Format the output as clean markdown.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        return response.text;
    } catch (error) {
        console.error("Error generating educational article:", error);
        return "Failed to generate educational article.";
    }
};
