import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PantryBuilder from "./pages/pantrybuilder";
import Login from "./pages/login";
import Topbar from "./modules/topbar/topbar-dev";

function App() {
  return (
    <div className="app">
      <main className="content">
        <Topbar />
        <div className="max-w-[80vw] m-auto justify-center text-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Pantry-Builder" element={<PantryBuilder />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
