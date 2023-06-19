import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-provider";
import { fetchIngredients } from "../../utils/api/firebase/ingredient-functions";
import buildRecipeString from "../../data/build-recipe-string";
import recipeInstructions from "../../data/build-recipe-instructions";
import { genRecipe } from "../../utils/api/openai/gen-functions";

const UserIngredients = () => {
  const { user } = useContext(UserContext);
  const uid = user.uid;

  const [ingredients, setIngredients] = useState([]);

  // This useEffect fetches the user's ingredients from Server DB when page loads.
  useEffect(() => {
    const getIngredients = async () => {
      const data = await fetchIngredients(user.uid).then((ingredient) => {
        setIngredients(ingredient);
        console.log(ingredient);
      });
    };

    console.log("getIngredients called!");
    getIngredients();
    console.log(`Ingredients: ${ingredients}`);
  }, []);

  const handleGenerateRecipe = async () => {
    try {
      console.log("Generating recipe...");
      const string = buildRecipeString({
        ingredients,
      });
      console.log(`Recipe string: ${string}`);
      const recipe = await genRecipe(`${string}`, `${recipeInstructions}`);
      console.log(`Recipe Created!`);
      console.log(recipe);
    } catch (e) {
      console.log(`Error generating recipe: ${e}`);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-4 items-center">
        {ingredients.map((ingredient) => {
          return (
            <div className="my-2 rounded-md bg-slate-500 w-[20vw] px-2 py-1">{`${ingredient}`}</div>
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={() => console.log(ingredients)}
          className="button-base my-2"
        >
          Log Ingredients
        </button>
        <button
          onClick={() => handleGenerateRecipe()}
          className="button-base my-2"
        >
          Generate Recipe
        </button>
      </div>
    </>
  );
};

export default UserIngredients;
