import React, { useEffect, useState } from 'react';
import FranchiseLogo from '../../../admin/franchise/component/FranchiseLogo';
import axios from 'axios';

const CheckRecipe = ({ data }) => {

  const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        // Axios를 사용하여 데이터를 가져오는 부분(Get)
        axios.get(`/search/recipe/${data}`) // 엔드포인트 수정
            .then(response => {
              setRecipes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [data]);

  return (
    <div>                    
      <div>레시피 {recipes.length}건
      </div><hr></hr>
      {recipes.map(recipe => (
                    <div key={recipe.recipeId}>
      <div className='sample-wrap'>
        <div className='sample-image'>{recipe.photoUrl}</div>
        <div className='sample-box'>
          <div className='sample-title'>{recipe.recipeName}&nbsp;&nbsp;
            <FranchiseLogo
              backColor="#ffffff"
              fontColor="#000000"
              name="tjfrhkdwls"/>
          </div>
          <div className='sample-content-box'>
            <div className='sample-content'>
              {recipe.description}
            </div>
            <div className='sample-info'>
              <div>{recipe.registerTime}/</div>
              <div>{recipe.author.userNickname}/</div>
              <div>{recipe.likesCount}/</div>
              <div>{recipe.viewsCount}</div>
            </div>
          </div>
        </div>
      </div>
      </div>))}
    </div>
  );
};

export default CheckRecipe;