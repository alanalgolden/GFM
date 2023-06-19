import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="h1">Gluten Free Me</div>
      <button
        className="button-base"
        onClick={() => navigate("/Pantry-Builder")}
      >
        Pantry Builder
      </button>
    </div>
  );
};

export default Home;
