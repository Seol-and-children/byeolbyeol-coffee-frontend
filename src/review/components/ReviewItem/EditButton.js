import { useNavigate } from 'react-router-dom';

const EditButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 원하는 경로로 이동하는 로직을 작성
    navigate('/review/write');
  };

  return (
    <button onClick={handleClick}>
      수정
    </button>
  );
};

export default EditButton;
