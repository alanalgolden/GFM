import React, { createContext, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, provider } from "../utils/api/firebase/firebase-config";
import { createUserDoc } from "../utils/api/auth/create-user";

export const UserContext = createContext(null);

// * Creates global User Context.
export const UserProvider = ({ children }) => {
  const loadUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  };

  const [user, setUser] = useState(loadUserFromLocalStorage);
  const [token, setToken] = useState();

  // * Prompts user with GoogleAuth Popup, through Firebase.
  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setToken(token);
        createUserDoc(user);
        console.log(user);
      })
      .catch((e) => {
        const errorMessage = e.message;
        console.log(errorMessage);
      });
  };

  // * Logs out currently signed in user.
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <UserContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
