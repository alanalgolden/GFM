import { model } from "./langchain-config";
import { PromptTemplate } from "langchain/prompts";
import {
  LLMChain,
  SequentialChain,
  SimpleSequentialChain,
} from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

const template = "You are making a recipe for someone with {allergies}.";
const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

// First working call using langchain
export const langchainRes = async () => {
  try {
    console.log("langchain res called!");
    const res = await model.call("Is this a good test?");
    console.log(res);
    return res;
  } catch (e) {
    console.log(`langchain res error: ${e}`);
    return;
  }
};

export const langchainRes2 = async (ingredients) => {
  //Template is odd because it does not use the grave literal, and rather references the object through an array in the template.
  const template = `Give 10 recipes names that use the following ingredients: {ingredients}`;

  //This creates a new Prompt Template, which formats the variables into a string. Our passed in variable (ingredients) is then used when the prompt is formated.
  const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["ingredients"],
  });

  try {
    console.log("langchain res2 called!");
    //First the prompt needs to be formated, but this is a much cleaner way to do it than my previous itterations.
    const formated = await prompt.format({ ingredients: `${ingredients}` });
    console.log(formated);

    //Then it again calls the model, but this time with the formated prompt.
    const res = await model.call(formated);
    console.log(res);
    return res;
  } catch (e) {
    console.log(`langchain res2 error: ${e}`);
    return;
  }
};

export const langchainRes3 = async (ingredients) => {
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
};
