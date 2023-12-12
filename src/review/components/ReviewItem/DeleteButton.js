// DeleteButton.js

import React from 'react';
import axios from 'axios';

const DeleteButton = ({ reviewId, onDelete }) => {
  const handleDelete = async () => {
    try {
      // 서버에 DELETE 요청을 보냅니다.
      await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`);
      
      // 삭제가 성공하면 onDelete 함수를 호출하여 상위 컴포넌트에서 필요한 처리를 할 수 있도록 합니다.
      onDelete();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      삭제
    </button>
  );
};

export default DeleteButton;
