import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const createUserDoc = async (user) => {
  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    try {
      await setDoc(docRef, {
        displayName: user.displayName,
        email: user.email,
        lastModified: serverTimestamp(),
      });
      console.log(
        `New user, ${user.displayName} created in Firestore with ID: ${user.uid}`
      );
    } catch (e) {
      console.log(`Error creating new user in Firestore: ${e}`);
    }
  } else {
    console.log(`${user.displayName} already exists with ID: ${user.uid}`);
  }
};
