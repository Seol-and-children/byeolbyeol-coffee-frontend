import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

// 모달 상세 내역
const AddModal = ({ isOpen, onClose, onSubmit }) => {
  // 모달 창 내에서의 상태 관리
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");

  //제출 버튼 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Axios를 사용하여 데이터를 삽입하는 부분(Post)
    try {
      const response = await axios.post("/option/ingredients", {
        ingredientName,
        ingredientUnit,
      });

      if (response.status === 200) {
        console.log("Report data sent successfully.");
        onSubmit();
        onClose();
      }
    } catch (error) {
      console.error("Error sending report data:", error);
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
              value={null}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </label>
          <br />

          <label>
            재료 단위 <br></br>
            <input
              type="text"
              value={null}
              onChange={(e) => setIngredientUnit(e.target.value)}
            />
          </label>
          <br />
        </div>

        <button type="submit">프렌차이즈 추가</button>
        {/* 닫기 버튼 추가 */}
        <button onClick={onClose}>취소</button>
      </form>
    </Modal>
  );
};

export default AddModal;
