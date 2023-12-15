import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetailViewPage.css";
import LikeButton from "../components/recipe/LikeButton";
import { useSelector } from "react-redux";
import FranchiseLogo from "../admin/franchise/component/FranchiseLogo";

function RecipeDetailViewPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const userId = user ? user.userId : null;
  const userRole = user ? user.userRole : null;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${recipeId}`
        );
        setRecipe(response.data);

        // 좋아요 상태 확인 요청 추가
        const likeStatusResponse = await axios.get(
          `http://localhost:8080/recipes/${recipeId}/likes/status`,
          {
            params: { userId }, // 현재 로그인한 사용자 ID
          }
        );
        setIsLiked(likeStatusResponse.data);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId, userId]);

  const handleDelete = async () => {
    // 로그인된 사용자의 ID와 레시피 작성자의 ID가 일치하는지 확인
    if (userId && recipe.authorId === userId) {
      const confirmDelete = window.confirm("정말로 레시피를 삭제하시겠습니까?");
      if (confirmDelete) {
        // 사용자가 '확인'을 클릭한 경우 삭제 로직 실행
        try {
          await axios.delete(`http://localhost:8080/recipes/${recipeId}`);
          navigate("/recipes");
        } catch (error) {
          console.error("레시피 삭제 실패:", error);
        }
      }
    } else {
      alert("본인의 레시피만 삭제할 수 있습니다.");
    }
  };

  const navigateToEdit = () => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  const toggleLike = async () => {
    // 로그인 상태 확인
    if (!userId) {
      alert("좋아요를 누르기 위해서는 먼저 로그인해야 합니다.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/recipes/${recipeId}/likes`, {
        userId: userId,
      });
      setIsLiked(!isLiked);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        likesCount: isLiked
          ? prevRecipe.likesCount - 1
          : prevRecipe.likesCount + 1,
      }));
    } catch (error) {
      console.error("레시피 좋아요 실패:", error);
    }
  };

  const isAuthor = recipe && userId && recipe.authorId === userId;

  if (!recipe) {
    return <div>레시피 불러오는중...</div>;
  }

  return (
    <div className="recipe-detail-view-page">
      <div className="header">
        <h1>RECIPE</h1>
        <div className="buttons">
          {userRole === 3 && (
            <button className="delete-button" onClick={handleDelete}>
              삭제
            </button>
          )}

          {userRole === 2 && isAuthor && (
            <div>
              <button className="edit-button" onClick={navigateToEdit}>
                수정
              </button>
              <button className="delete-button" onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="author-info">
        <p>{recipe.userNickname}</p>
        <p>{formatDate(recipe.registerTime)}</p>
      </div>

      <div className="center-class">
        <div className="recipe-info">
          <div className="image-container">
            <img
              src={`http://localhost:8080/recipeimgs/${recipe.photoUrl}`}
              alt={recipe.recipeName}
            />
          </div>
          <div className="details">
            <div className="recipe-title">{recipe.recipeName}</div>
            <div className="franchise">
              <FranchiseLogo franchiseInfo={recipe.franchiseId}></FranchiseLogo>
            </div>
            <div className="options">
              <div className="base-beverage">
                <div className="base-beverage-name">
                  베이스 음료: {recipe.baseBeverageVO.name}
                </div>
                <div className="base-bevarage-size">
                  {recipe.baseBeverageVO.size} 사이즈
                </div>
                <div className="base-bevarage-temperature">
                  {recipe.baseBeverageVO.temperature}
                </div>
              </div>
              <div className="custom-option">
                <ul>
                  {recipe.customOptions.map((option, index) => (
                    <li className="option-row" key={index}>
                      <div className="option-name">
                        {option.customOptionName}
                      </div>
                      <div className="quantity">{option.quantity}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="description">{recipe.description}</div>
        </div>
        {userRole === 2 && !isAuthor && (
          <div className="report-button">
            <button>신고하기</button>
          </div>
        )}
        <div className="like-button">
          <div className="like-icon">
            <LikeButton isLiked={isLiked} toggleLike={toggleLike} />
          </div>
          <div className="like-count">{recipe.likesCount}</div>
        </div>

        <div className="comment">
          <div className="comment-info"></div>
          <div className="add-comment"></div>
        </div>

        <div className="list-button">
          <button onClick={() => navigate("/recipes")}>목록</button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailViewPage;
