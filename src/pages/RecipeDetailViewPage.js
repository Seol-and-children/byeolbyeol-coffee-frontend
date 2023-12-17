import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetailViewPage.css";
import LikeButton from "../components/recipe/LikeButton";
import ReportAdd from "../admin/report/component/ReportAdd";
import { useSelector } from "react-redux";
import FranchiseLogo from "../admin/franchise/component/FranchiseLogo";
import DeleteIcon from "../assets/DeleteIcon.svg";
import EditIcon from "../assets/Edit.svg";
import ListIcon from "../assets/ListIcon.svg";

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

        const likeStatusResponse = await axios.get(
          `http://localhost:8080/recipes/${recipeId}/likes/status`,
          {
            params: { userId },
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
    if (userRole === 3 || (userId && recipe.authorId === userId)) {
      const confirmDelete = window.confirm("정말로 레시피를 삭제하시겠습니까?");
      if (confirmDelete) {
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

  const navigateToUserPage = () => {
    navigate(`/users/${recipe.authorId}`);
  };

  const navigateToEdit = () => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  const toggleLike = async () => {
    if (userRole === 3) {
      alert("관리자는 좋아요를 누를 수 없습니다.");
      return;
    }

    if (!userId) {
      alert("먼저 로그인해야 합니다.");
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
              <img src={DeleteIcon} alt="삭제"></img>
            </button>
          )}

          {userRole === 2 && isAuthor && (
            <div>
              <button className="edit-button" onClick={navigateToEdit}>
                수정
                <img src={EditIcon} alt="수정"></img>
              </button>
              <button className="delete-button" onClick={handleDelete}>
                삭제
                <img src={DeleteIcon} alt="삭제"></img>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="author-info">
        <p className="user-button" onClick={navigateToUserPage}>
          {recipe.userNickname}
        </p>
        <p className="register-time">{formatDate(recipe.registerTime)}</p>
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
            <ReportAdd addRecipeId={recipe.recipeId} />
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
          <button onClick={() => navigate("/recipes")}>
            <img src={ListIcon} alt="목록"></img>
            목록
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailViewPage;
