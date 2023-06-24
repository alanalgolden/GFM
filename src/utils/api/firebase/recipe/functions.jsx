import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDocFromCache,
  getDocFromServer,
  arrayRemove,
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase-config";

// ~~~~~~~~~~~~~~~~ //
// Core Copy //
/* export const fetchIngredientsTEST = async (uid) => {
  const docRef = doc(db, "userPantryIngredients", uid);

  try {
    const doc = await getDocFromServer(docRef);
    const ingredients = doc.data().pantryIngredients;
    console.log(`Got doc data ${ingredients} from server!`);
    return ingredients;
  } catch (e) {
    console.log(`Error fetching doc data: ${e}`);
  }
};
 */

// ~~~~~~~~~~~~~~~~ //

const recipes = "recipes";

export const recipeGetDoc = async (recipeId) => {
  const docRef = doc(db, `${recipes}`, recipeId);

  try {
    const doc = await getDocFromServer(docRef);

    // LOG
    console.log(doc.data());
  } catch (e) {
    // LOG
    console.log(`Error getting recipe doc: ${e}`);
  }
};

export const recipeCreate = async (userId, recipe) => {
  try {
    const docRef = await addDoc(collection(db, "recipes"), {
      userId: userId,
      created: serverTimestamp(),
      lastModified: serverTimestamp(),
      //Make the access be recipe.name
      nameOrigin: recipe.recipeName,
      nameChanges: recipe.recipeName,
      nameActiveChanges: recipe.recipeName,
      //Make ingredients in an array
      ingredientsOrigin: recipe.recipeIngredients,
      ingredientsChanges: recipe.recipeIngredients,
      ingredientsActiveChanges: recipe.recipeIngredients,

      //Set this AFTER creation, use await(addHistoryInsteadofHere)
      //historyID: ["test7", "test8"],
    });

    //const docRef = collection(db, "recipes");
    //const docData = doc;

    const doc = await recipeGetDoc(docRef.id);
    // LOGS
    console.log(doc);

    return docRef;
  } catch (e) {
    // LOG
    console.log(`Error creating recipe: ${e}`);
  }
};
