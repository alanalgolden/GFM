import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  getDocFromCache,
  getDocFromServer,
  arrayRemove,
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase-config";
import { UserContext } from "../../../../context/user-provider";
import { useContext } from "react";

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

export const userModifyDoc = async (uid, field, data) => {
  const userDoc = await userCheckForField(uid, field);
  console.log(userDoc);

  if (userDoc) {
    switch (field) {
      case "activeRecipes":
        userUpdateActiveRecipeNames(data);
        break;
    }
  } else {
    switch (field) {
      case "activeRecipes":
        userCreateActiveRecipeNames(uid, data);
        break;
    }
  }
};

async function userCreateActiveRecipeNames(uid, data) {
  const docRef = doc(db, "Users", uid);

  try {
    const res = await updateDoc(docRef, { activeRecipeNames: data });
    return;
  } catch (e) {
    console.log(`Error creating ActiveRecipeNames user doc: ${e}`);
  }
}

// why is this throwing an error? fix tomorrow
async function userCheckForField(uid, field) {
  const doc = await getDocFromServer(uid);

  try {
    const data = doc.data();

    if (doc.hasOwnProperty(field)) {
      console.log("returning true");
      return true;
    } else {
      console.log("returning false");
      return false;
    }
  } catch (e) {
    console.log(`Error checking for user field: ${e}`);
  }
}

const userAddToDoc = async (userId, addField, addData) => {};

async function userUpdateDoc(userId, updateField, updateData) {
  const docRef = doc(db, "users", userId);
}
