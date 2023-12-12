// CancelButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 여기서 라우팅을 수행합니다.
    navigate('/'); // 예시로 루트 페이지로 이동하도록 설정했습니다.
  };

  return (
    <button className="cancel-button" onClick={handleClick}>취소하기
    </button>
  );
};

export default CancelButton;
