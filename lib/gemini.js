import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function extractVoters(imageBase64){

const model = genAI.getGenerativeModel({
model: "gemini-1.5-flash"
});

const prompt = `
This is a Kerala voter list page.

Each box contains a voter.

Extract:

SerialNo
Name
GuardianName
HouseNo
Gender
Age

Return JSON array only.
`;

const result = await model.generateContent([
prompt,
{
inlineData:{
mimeType:"image/png",
data:imageBase64
}
}
]);

return result.response.text();

}
