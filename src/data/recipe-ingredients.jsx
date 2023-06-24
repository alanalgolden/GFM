const recipeIngredients = ({ ingredients, recipeName }) => {
  return `
    Create a list of ingredients for a ${recipeName} recipe using any of these ingredients.
    Add on ingredients if needed to make a full meal.
    Do not include ingredients that would cause an allergic reaction to the follow allergens.
    
    Ingredients: ${ingredients}
    Allergens: ${allergens}
  
  {
      "recipe": [
          "ingredient1", ingredient2", "ingredient3", ...etc
      ],
  }
  `;
};

export default recipeIngredients;
