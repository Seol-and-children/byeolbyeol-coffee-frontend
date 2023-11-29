import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeViewPage from "./pages/RecipeViewPage";
import AddRecipePage from "./pages/AddRecipePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/recipe-view" element={<RecipeViewPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
