import React, { useState } from "react";

const PantryBuilder = () => {
  const [page, setPage] = useState(0);

  const pageSwitcher = () => {
    switch (page) {
      case 0:
        return;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="h1">Pantry Builder</div>
    </div>
  );
};

export default PantryBuilder;
