import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function transliterateMalayalam(data){

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const prompt = `
Convert Malayalam names to English transliteration.
Return the same JSON structure.

${JSON.stringify(data)}
`;

  const result = await model.generateContent(prompt);

  return data; // you can parse Gemini result later
}
