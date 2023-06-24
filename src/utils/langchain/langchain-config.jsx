import { OpenAI } from "langchain/llms/openai";

const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

export const model = new OpenAI({ openAIApiKey: apiKey, temperature: 0 });
