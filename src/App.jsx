import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PantryBuilder from "./pages/pantrybuilder";

function App() {
  return (
    <div className="app">
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Pantry-Builder" element={<PantryBuilder />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
