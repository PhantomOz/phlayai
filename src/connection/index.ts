const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
