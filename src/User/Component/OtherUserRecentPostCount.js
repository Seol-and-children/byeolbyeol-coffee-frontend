import React, { useState, useEffect } from "react";
import axios from "axios";

function OtherUserRecentPostCount({ userId }) {
  const [recipeCount, setRecipeCount] = useState(0); 

  useEffect(() => {
    console.log("UserRecentRecipes에서 받은 userId:", userId); 
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/recipes");
        const userRecipes = response.data.filter((recipe) => recipe.authorId === userId);

        setRecipeCount(userRecipes.length);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [userId]);

  return (
    <div>
      <p>작성한 레시피 : {recipeCount} 개</p>
    </div>
  );
}

export default OtherUserRecentPostCount;
