import React, { useState } from "react";
import UserIngredients from "../features/users/user-ingredients";

const PantryBuilder = () => {
  const [page, setPage] = useState(0);

  const pageSwitcher = () => {
    switch (page) {
      case 0:
        return <UserIngredients />;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="h1">Pantry Builder</div>
      {pageSwitcher()}
    </div>
  );
};

export default PantryBuilder;
