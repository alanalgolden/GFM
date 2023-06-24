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

export const createRecipeChain = async (ingredients, allergies) => {
  console.log("createRecipeChain called!");
  console.log(ingredients);
  console.log(allergies);
  const nameModel = new OpenAI({
    model: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
    temperature: 1.5,
  });
  const ingredientsModel = new OpenAI({
    model: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
    temperature: 0.9,
  });

  console.log("Name Chain...");
  // SEC ~~ NAME CHAIN ~~
  const namePrompt = `Give the name of a recipe that uses any of the following ingredients: {ingredients} and does not contain the following allergens: {allergens}.  Only respond in this format:
    recipeName
  `;

  console.log(namePrompt);

  const namePromptTemplate = new PromptTemplate({
    template: namePrompt,
    inputVariables: ["ingredients", "allergens"],
  });

  const nameChain = new LLMChain({
    llm: nameModel,
    prompt: namePromptTemplate,
    outputVariables: "recipeName",
  });

  console.log("nameChain Result...");
  console.log(nameChain);

  console.log("Ingredients Chain...");
  // SEC ~~ INGREDIENTS CHAIN ~~
  const ingredientsPrompt = `Give the ingredients for a recipe named {text} that uses the following ingredients: ${ingredients} and does not contain the following allergens: ${allergies}. You can add more ingredients and spice to make a full and delicious meal. Output as format for JSON.parse:
{{
  "recipeName": "{text}",
  "recipeIngredients": [
    "\ingredient1\", "\ingredient2\", "\ingredient3\", ...etc,
        ]
}}
`;
  const ingredientsPromptTemplate = new PromptTemplate({
    template: ingredientsPrompt,
    inputVariables: ["text", "recipeName"],
  });

  const ingredientsChain = new LLMChain({
    llm: ingredientsModel,
    prompt: ingredientsPromptTemplate,
    outputKey: "recipeIngredients",
  });

  console.log("ingredients Result...");
  console.log(ingredients);

  const recipeChain = new SequentialChain({
    chains: [nameChain, ingredientsChain],
    inputVariables: ["ingredients", "allergens", "recipeName"],
    outputVariables: ["recipeName", "recipeIngredients"],
    verbose: true,
    //returnAll: true,
  });

  console.log("Recipe Chain...");
  //console.log(recipeChain);

  async function executeChain() {
    const recipe = await recipeChain.call({
      ingredients: ingredients,
      allergens: allergies,
    });
    console.log("Recipe Result...");
    console.log(recipe.recipeIngredients);
    console.log(recipe.recipeName);
    console.log(recipe);

    return recipe;
  }

  const chain = await executeChain();
  return chain;
  /*   console.log(chain.recipeIngredients);
  const parsedChain = JSON.parse(chain.recipeIngredients);
  console.log(parsedChain);
  console.log(parsedChain.recipeIngredients); */

  //console.log(recipe);

  /*  const nameTemplate = `Give the name of a recipe that uses the following ingredients: {ingredients} and does not contain the following allergens: {allergens}`;
  const namePrompt = new PromptTemplate({
    template: nameTemplate,
    inputVariables: ["ingredients", "allergens"],
  });

  const chain = new LLMChain({ llm: llm, prompt: namePrompt });

  try {
    console.log("Calling chain...");
  } catch (e) {
    console.log(`createRecipeChain error: ${e}`);
  } */
};

export const createRecipeChain2 = async (ingredients, allergies) => {
  const llm = model;

  const nameTemplate = `Give the name of a {mealType} recipe that any of the following ingredients: ${ingredients} and does not contain the following allergens: ${allergies}`;

  const namePromptTemplate = new PromptTemplate({
    nameTemplate,
    inputVariables: ["mealType"],
  });
};
