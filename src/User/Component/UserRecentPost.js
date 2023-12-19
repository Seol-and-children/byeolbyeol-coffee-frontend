import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserRecentPost.module.css";

function UserRecentRecipes({ userId }) {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userId = userData.userId;

        const response = await axios.get("/recipes");
        const userRecipes = response.data
          .filter((recipe) => recipe.authorId === userId)
          .sort((a, b) => b.recipeId - a.recipeId)
          .slice(0, 3);

        console.log("Sorted and Filtered Recipes:", userRecipes);

        setRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [userId]);

  const handleClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <li
            key={recipe.recipeId}
            onClick={() => handleClick(recipe.recipeId)}
            className={styles.recipeItem}
          >
            <article>
              <p className={styles.recipeName}> • {recipe.recipeName}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRecentRecipes;
