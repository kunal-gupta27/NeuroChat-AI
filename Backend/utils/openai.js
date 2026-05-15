import "dotenv/config";
import axios from "axios";

const groqClient = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export const askGroq = async (prompt) => {
  const response = await groqClient.post("/chat/completions", {
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
    temperature: 1.2,
    top_p: 0.95,
    presence_penalty: 1.2,
    frequency_penalty: 0.8,
  });

  return response.data.choices[0].message.content;
};
