import React, { useContext } from "react";
import { UserContext } from "../../context/user-provider.jsx";
import {
  langchainRes,
  langchainRes2,
  langchainRes3,
} from "../../utils/langchain/firstchain.jsx";
import { createRecipeChain } from "../../utils/langchain/create-recipe-chain.jsx";
import {
  recipeCreate,
  recipeGetDoc,
} from "../../utils/api/firebase/recipe/functions.jsx";
import { genFiveRecipeNames } from "../../utils/langchain/individual-prompts.jsx";
import { userModifyDoc } from "../../utils/api/firebase/user/functions.jsx";

const Topbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center h-12 px-10 mb-8 bg-slate-800">
      <div className="font-bold italic mx-4">Dev Topbar</div>
      {/*       <button
        onClick={() => console.log(user)}
        className="button-base text-sm mx-2"
      >
        Print User
      </button> */}
      <button
        onClick={() => genFiveRecipeNames("Potatoes, Rice, Chicken, Beef")}
        className="button-base text-sm mx-2"
      >
        Gen 5 Recipe Names
      </button>
      {/*       <button
        onClick={() => recipeCreate(user.uid, "BB")}
        className="button-base text-sm mx-2"
      >
        Create Recipe
      </button> */}
      <button
        onClick={() => recipeGetDoc("rTMemxjVdFQoKz0jsn8J")}
        className="button-base text-sm mx-2"
      >
        Get Recipe
      </button>
      <button
        onClick={async () => {
          const recipe = await createRecipeChain(
            "Potatoes, Rice, Chicken, Beef, Angel Hair",
            "Gluten"
          );
          console.log(recipe);
          const parsedChain = JSON.parse(recipe.recipeIngredients);
          console.log(parsedChain);
          recipeCreate(user.uid, parsedChain);
        }}
        className="button-base text-sm mx-2"
      >
        Recipe Chain
      </button>
      <button
        onClick={() => {
          userModifyDoc(user.uid, "activeRecipes", [
            "tuna salad",
            "chicken salad",
            "pasta salad",
            "garden salad",
            "salad",
          ]);
        }}
      >
        userModifyDoc
      </button>
    </div>
  );
};

export default Topbar;
