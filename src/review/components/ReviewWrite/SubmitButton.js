import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitButton = ({ onSubmit }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (onSubmit && typeof onSubmit === 'function') {
        await onSubmit();
        navigate('/reviews');
      }
    } catch (error) {
      console.error('제출 실패:', error);
    }
  };

  return (
    <button className="submit-button" onClick={handleSubmit}>등록하기</button>
  );
};

export default SubmitButton;
