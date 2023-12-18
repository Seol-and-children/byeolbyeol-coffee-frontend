import React from 'react';
import axios from 'axios';

const FranchiseToggle = ({ franchiseId, processing, onUpdate }) => {
  const handleToggle = async () => {
    try {
      // 서버에 수정 요청을 보내고 데이터를 업데이트한다.
      await axios.put(`/option/franchises/process/${franchiseId}`, {
        processing: !processing,
      });

      // 최신 데이터로 업데이트
      //외부에서 이 컴포넌트의 값을 사용시 onUpdate를 이용해 사용
      onUpdate(franchiseId, !processing);
    } catch (error) {
      console.error('Error toggling processing:', error);
    }
  };
  

  return (
    <button className='process-Btn' onClick={handleToggle}>
      {processing ? '사용중' : '미사용'}
    </button>
  );
};

export default FranchiseToggle;