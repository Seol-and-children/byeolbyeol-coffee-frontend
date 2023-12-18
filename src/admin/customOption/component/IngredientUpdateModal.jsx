import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

// 모달 상세 내역
const IngredientModalComponent = ({
  isOpen,
  onClose,
  ingredientId,
  onSubmit,
}) => {
  // 모달 창 내에서의 상태 관리
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");

  useEffect(() => {
    axios
      .get(`/option/ingredients/${ingredientId}`)
      .then((response) => {
        setIngredients(response.data);
        setIngredientName(response.data.ingredientName); // 초기값 설정
        setIngredientUnit(response.data.ingredientUnit); // 초기값 설정
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [ingredientId]);

  //제출 버튼 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Axios를 사용하여 데이터를 삽입하는 부분(Post)
    try {
      const response = await axios.put(
        `/option/ingredients/info/${ingredientId}`,
        {
          ingredientName,
          ingredientUnit,
        }
      );

      if (response.status === 200) {
        console.log("data sent successfully.");
      }
      onClose();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="custom-modal">
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="modal-top">레시피 재료 관리</div>
        <div className="wrap-modal">
          <label>
            재료 이름 <br></br>
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </label>
          <br />

          <label>
            재료 단위 <br></br>
            <input
              type="text"
              value={ingredientUnit}
              onChange={(e) => setIngredientUnit(e.target.value)}
            />
          </label>
          <br />
        </div>
        <button type="submit">수정하기</button>
        {/* 닫기 버튼 추가 */}
        <button onClick={onClose}>취소</button>
      </form>
    </Modal>
  );
};

export default IngredientModalComponent;
