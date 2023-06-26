import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { model } from "./langchain-config";

/* export const langchainRes3 = async (ingredients) => {
    const template = `Give 10 recipes names that use the following ingredients: {ingredients}`;
    const prompt = new PromptTemplate({
      template: template,
      inputVariables: ["ingredients"],
    });
  
    //This itteration of the chain is much cleaner, and allows for the prompt to be passed in as an object.
    const chain = new LLMChain({ llm: model, prompt: prompt });
  
    try {
      console.log("langchain res3 called!");
      console.log(chain);
      const res = await chain.call({ ingredients: `${ingredients}` });
      console.log(res);
      return res;
    } catch (e) {
      console.log(`langchain res3 error: ${e}`);
      return;
    }
  }; */

export const genFiveRecipeNames = async (ingredients) => {
  const template = `
    Give 5 recipes names that use the following ingredients: {ingredients}
    Put the names in the following format:
    {{
        "recipes": [
        "\recipe1\", "\recipe2\", "\recipe3\", "\recipe4\", "\recipe5\"
            ]
    }}
    `;

  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["ingredients"],
  });

  const chain = new LLMChain({ llm: model, prompt: prompt });

  try {
    const res = await chain.call({ ingredients: `${ingredients}` });
    /*     console.log(res);
    console.log(res.text); */
    const formatted = JSON.parse(res.text);
    console.log(formatted);
    return res;
  } catch (e) {
    console.log(`langchain res3 error: ${e}`);
    return;
  }
};
