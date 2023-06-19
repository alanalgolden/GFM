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
} from "firebase/firestore";

import { db } from "../firebase/firebase-config";

export const fetchIngredients = async (uid) => {
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
