// SubmitButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitButton = ({ onSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await onSubmit(); // 제출이 완료될 때까지 기다립니다.
      // 성공적으로 제출한 후에 페이지를 이동할 수 있습니다. 필요에 따라 이 부분을 수정하세요.
      navigate('/');
    } catch (error) {
      // 여기서 에러를 처리하세요. 사용자에게 에러 메시지를 표시하려면 이 부분을 수정하세요.
      console.error('제출 실패:', error);
    }
  };

  return (
    <button className="submit-button" onClick={handleSubmit}>제출하기</button>
  );
};

export default SubmitButton;
