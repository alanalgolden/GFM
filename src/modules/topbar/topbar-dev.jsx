import React, { useContext } from "react";
import { UserContext } from "../../context/user-provider.jsx";
import {
  langchainRes,
  langchainRes2,
  langchainRes3,
} from "../../utils/langchain/firstchain.jsx";

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
    </div>
  );
};

export default Topbar;
