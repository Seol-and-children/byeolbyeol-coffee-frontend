import React, { useState } from "react";
import "./LikeButton.css";

function LikeButton({ initialCount }) {
  const [likeCount, setLikeCount] = useState(initialCount);

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
  };

  return (
    <button className="like-button" onClick={handleLikeClick}>
      👍 {likeCount}
    </button>
  );
}

export default LikeButton;
