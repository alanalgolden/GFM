import axios from "axios";

export const genRecipe = async (data, instructions) => {
  const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: data },
        { role: "system", content: instructions },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.choices[0].message.content;
};
