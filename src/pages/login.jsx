import React, { useContext } from "react";
import { UserContext } from "../context/user-provider.jsx";

const Login = () => {
  const { handleLogin } = useContext(UserContext);

  const onSignInWithGoogle = async () => {
    await handleLogin();
  };

  return (
    <div className="flex flex-col text-center">
      <div className="h1">Login</div>
      <button className="button-base" onClick={onSignInWithGoogle}>
        Sign-in with Google
      </button>
    </div>
  );
};

export default Login;
