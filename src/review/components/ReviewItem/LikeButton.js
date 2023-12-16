import React from "react";
import likedIcon from "../../../assets/liked.png";
import unlikedIcon from "../../../assets/unliked.png";

function LikeButton({ isLiked, toggleLike }) {
  return (
    <button onClick={toggleLike}>
      <img src={isLiked ? likedIcon : unlikedIcon} alt="Like" />
    </button>
  );
}

export default LikeButton;
