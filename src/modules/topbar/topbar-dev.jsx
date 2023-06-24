import React, { useContext } from "react";
import { UserContext } from "../../context/user-provider.jsx";
import {
  createRecipeChain,
  langchainRes,
  langchainRes2,
  langchainRes3,
} from "../../utils/langchain/firstchain.jsx";
import {
  recipeCreate,
  recipeGetDoc,
} from "../../utils/api/firebase/recipe/functions.jsx";

const Topbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center h-12 px-10 mb-8 bg-slate-800">
      <div className="font-bold italic mx-4">Dev Topbar</div>
      <button
        onClick={() => console.log(user)}
        className="button-base text-sm mx-2"
      >
        Print User
      </button>
      <button
        onClick={() => langchainRes3("chicken, rice, beans")}
        className="button-base text-sm mx-2"
      >
        Langchain Test
      </button>
      <button
        onClick={() => recipeCreate(user.uid, "BB")}
        className="button-base text-sm mx-2"
      >
        Create Recipe
      </button>
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
    </div>
  );
};

export default Topbar;
