import React, { useState, useEffect } from "react";
import axios from "axios";

function UserRecentPostCount({ userId }) {
  const [recipeCount, setRecipeCount] = useState(0); // 레시피 개수 상태

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userId = userData.userId;

        const response = await axios.get("/recipes");
        const userRecipes = response.data.filter((recipe) => recipe.authorId === userId);

        setRecipeCount(userRecipes.length); // 레시피 개수 설정
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [userId]);

  return (
    <div>
      <p>작성한 레시피 : {recipeCount} 개</p> {/* 레시피 개수 출력 */}
    </div>
  );
}

export default UserRecentPostCount;
