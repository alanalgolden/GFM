import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SequentialChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
const apiKey = import.meta.env.VITE_OPEN_AI_API_KEY;

export const createRecipeChain = async (ingredients, allergies) => {
  console.log("createRecipeChain called!");
  console.log(ingredients);
  console.log(allergies);

  //gpt-3.5-turbo | temp 1.2
  const nameModel = new OpenAI({
    model: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
    temperature: 1.2,
  });

  //gpt-3.5-turbo | temp 0.9
  const ingredientsModel = new OpenAI({
    model: "gpt-3.5-turbo",
    openAIApiKey: apiKey,
    temperature: 0.9,
  });

  // ~~ PROMPTS ~~ //
  const namePrompt = `Give the name of a recipe that uses any of the following ingredients: {ingredients} and does not contain the following allergens: {allergens}.  Only respond in this format:
      recipeName
    `;

  const ingredientsPrompt = `Give the ingredients for a recipe named {text} that uses the following ingredients: ${ingredients} and does not contain the following allergens: ${allergies}. You can add more ingredients and spice to make a full and delicious meal. Output as format for JSON.parse:
    {{
        "recipeName": "{text}",
        "recipeIngredients": [
        "\ingredient1\", "\ingredient2\", "\ingredient3\", ...etc,
            ]
    }}
    `;

  // ~~ NAME CHAIN ~~ //
  // LOG : console.log("Name Chain...");
  const namePromptTemplate = new PromptTemplate({
    template: namePrompt,
    inputVariables: ["ingredients", "allergens"],
  });
  const nameChain = new LLMChain({
    llm: nameModel,
    prompt: namePromptTemplate,
    outputVariables: "recipeName",
  });
  // LOG : console.log(`nameChain Result... ${nameChain}`);

  // ~~ INGREDIENTS CHAIN ~~ //
  // LOG : console.log("Ingredients Chain...");
  const ingredientsPromptTemplate = new PromptTemplate({
    template: ingredientsPrompt,
    inputVariables: ["text", "recipeName"],
  });
  const ingredientsChain = new LLMChain({
    llm: ingredientsModel,
    prompt: ingredientsPromptTemplate,
    outputKey: "recipeIngredients",
  });
  // LOG : console.log(`ingredients Result... ${ingredientsChain}`);

  const recipeChain = new SequentialChain({
    chains: [nameChain, ingredientsChain],
    inputVariables: ["ingredients", "allergens", "recipeName"],
    outputVariables: ["recipeName", "recipeIngredients"],
    verbose: true,
  });
  // LOG :console.log(`Recipe Chain... ${recipeChain}`);

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
};
