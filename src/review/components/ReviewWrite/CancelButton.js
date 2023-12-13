import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/reviews');
  };

  return (
    <button className="cancel-button" onClick={handleClick}>취소하기</button>
  );
};

export default CancelButton;
