import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Baa from "./Baa";

function App() {
  return (
      <Router>
        <div>
          <Baa />
          <Route path="/recipe-view" element={<RecipeViewPage />} />
          <Route path="/add-recipe" element={<AddRecipePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;