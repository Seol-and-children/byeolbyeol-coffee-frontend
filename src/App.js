import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Baa from "./Baa";
import RecipeViewPage from "./pages/RecipeViewPage";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetailViewPage from "./pages/RecipeDetailViewPage";

function App() {
  return (
    <Router>
      <div>
        <Baa />
        <Routes>
          <Route path="/recipes" element={<RecipeViewPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetailViewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
