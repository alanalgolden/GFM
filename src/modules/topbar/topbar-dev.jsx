import React, { useContext } from "react";
import { UserContext } from "../../context/user-provider.jsx";

const Topbar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center h-12 px-10 mb-8 bg-slate-800">
      <div className="font-bold italic mx-4">Dev Topbar</div>
      <button className="button-base text-sm" onClick={() => console.log(user)}>
        Print User
      </button>
    </div>
  );
};

export default Topbar;
