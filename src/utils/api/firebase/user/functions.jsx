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
export const fetchIngredientsTEST = async (uid) => {
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

// ~~~~~~~~~~~~~~~~ //

export const userModifyDoc = async (uid, collection, property, data) => {
  const userDoc = await userCheckForProperty(uid, collection, property);
  console.log(userDoc);

  if (userDoc === true) {
    switch (property) {
      case "activeRecipeNames":
        console.log("Update Active Recipes");
        userUpdateActiveRecipeNames(uid, data);
        break;
    }
  } else {
    switch (property) {
      case "activeRecipeNames":
        console.log("Create Active Recipes");
        userCreateActiveRecipeNames(uid, data);
        break;
    }
  }
};

// NOTE - This function will store the previous recipe names in the user doc
async function userUpdateActiveRecipeNames(uid, data) {
  const docRef = doc(db, "Users", uid);

  try {
    const prevRecipes = await getDocFromServer(docRef);
    console.log(prevRecipes.data().activeRecipeNames);
    const saveRecipes = await updateDoc(docRef, {
      prevRecipeNames: prevRecipes.data().activeRecipeNames,
    });
    const res = await updateDoc(docRef, { activeRecipeNames: data });
    return;
  } catch (e) {
    console.log(`Error updating ActiveRecipeNames user doc: ${e}`);
  }
}

// NOTE - This function will create the active recipe names in the user doc, if it doesn't exist yet
async function userCreateActiveRecipeNames(uid, data) {
  const docRef = doc(db, "Users", uid);

  try {
    const res = await updateDoc(docRef, { activeRecipeNames: data });
    return;
  } catch (e) {
    console.log(`Error creating ActiveRecipeNames user doc: ${e}`);
  }
}

async function userCheckForProperty(uid, collection, property) {
  const docRef = doc(db, collection, uid);

  try {
    const docGet = await getDocFromServer(docRef);
    const docData = docGet.data();

    if (docData.hasOwnProperty(property)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(`Error checking for user property: ${e}`);
  }
}

async function userUpdateDoc(userId, updateproperty, updateData) {
  const docRef = doc(db, "users", userId);
}

const userAddToDoc = async (userId, addproperty, addData) => {};
