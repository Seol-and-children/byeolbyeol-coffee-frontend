import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './UserRecentPost.module.css'

function UserRecentRecipes({ userId }) {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/recipes');
        const userRecipes = response.data
          .filter(recipe => recipe.authorId === userId) // 사용자 ID로 필터링
          .sort((a, b) => b.recipeId - a.recipeId) // 레시피 ID가 높은 순으로 정렬
          .slice(0, 3); // 상위 3개만 선택

          console.log("Sorted and Filtered Recipes:", userRecipes);

        setRecipes(userRecipes); // 상위 3개의 레시피를 상태에 설정
      } catch (error) {
        console.error('Error fetching recipes', error);
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
        {recipes.map(recipe => (
          <li key={recipe.recipeId}  onClick={() => handleClick(recipe.recipeId)} className={styles.recipeItem}>
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
