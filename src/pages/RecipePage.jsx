import React from "react";
import LikeButton from "../components/common/LikeButton";

const RecipePage = () => {
  return (
    <div>
      <h1>Recipe Page 입니다</h1>
      {}
      <LikeButton initialCount={50} />
    </div>
  );
};

export default RecipePage;
