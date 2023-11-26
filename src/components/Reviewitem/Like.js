// 좋아요 표시
import React from 'react';

const Like = ({ likes }) => {
  return (
    <div className="like">
      <button>추천</button>
      <span>{likes}</span>
    </div>
  );
};

export default Like;
