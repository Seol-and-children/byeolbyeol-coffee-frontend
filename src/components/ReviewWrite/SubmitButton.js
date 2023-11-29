// SubmitButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitButton = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // 여기서 등록 또는 제출 관련 로직을 수행합니다.
    // 예시로 루트 페이지로 이동하도록 설정했습니다.
    navigate('/');
  };

  return (
    <button className="submit-button" onClick={handleSubmit}>등록하기
    </button>
  );
};

export default SubmitButton;
