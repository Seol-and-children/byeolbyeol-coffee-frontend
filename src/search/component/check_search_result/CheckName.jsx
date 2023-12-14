import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FranchiseLogo from '../../../admin/franchise/component/FranchiseLogo';

const CheckName = ({ data }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
      // Axios를 사용하여 데이터를 가져오는 부분(Get)
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(`/search/recipe/nickname/${data}`) // 엔드포인트 수정
          const userRecipes = response.data
            .sort((a, b) => b.recipeId - a.recipeId)
            .slice(0, 5);
            setRecipes(userRecipes);
          } catch (error) {
            console.error('Error fetching recipes', error);
          }
        };

        fetchRecipes();
  }, [data]);

   
  
const handleFranchiseClick = (recipeId) => {
  // 페이지 이동과 함께 새로고침
  window.location.href = `/recipes/${recipeId}`;
};

  return (
    <div>
      <div>레시피 / 닉네임은 최신 5개까지만 표시됩니다.
      </div><hr></hr>
      {recipes.map(recipe => (
      <div className='sample-wrap'>
        <div className='sample-image'>{recipe.photoUrl}</div>
        <div className='sample-box'>
          <div className='sample-title' onClick={() => handleFranchiseClick(recipe.recipeId)}>{recipe.recipeName}&nbsp;&nbsp;
          <div className='search-logo'>
          <FranchiseLogo franchiseInfo={recipe.franchiseCafeVO.franchiseId} /></div>
          </div>
          <div className='sample-content-box'>
            <div className='sample-content'>
            {recipe.description}
            </div>
            <div className='sample-info'>
              <div>{recipe.registerTime}</div>
              <div>{recipe.author.userNickname}</div>
              <div>{recipe.likesCount}</div>
              <div>{recipe.viewsCount}</div>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default CheckName;