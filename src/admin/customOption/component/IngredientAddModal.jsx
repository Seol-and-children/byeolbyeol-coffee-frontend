import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

// 모달 상세 내역
const AddModal = ({ isOpen, onClose, onSubmit }) => {
  // 모달 창 내에서의 상태 관리
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientUnit, setIngredientUnit] = useState("");
  const [processing, setProcessing] = useState(true);

  //제출 버튼 이벤트
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Axios를 사용하여 데이터를 삽입하는 부분(Post)
    try {
      const response = await axios.post("/option/ingredients", {
        ingredientName,
        ingredientUnit,
        processing
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
    <Modal isOpen={isOpen} onRequestClose={onClose} className="report-add-modal">
      <form className="report-modal-form" onSubmit={handleSubmit}>
        <div className="report-modal-top">레시피 재료 관리</div>
        <div className="report-wrap-modal">
          <div className="franchise-label-modal">
            재료 이름 <br></br>
            <input
            className="franchise-input-modal"
              type="text"
              value={null}
              onChange={(e) => setIngredientName(e.target.value)}
            />
          </div>
          <br />

          <div className="franchise-label-modal">
            재료 단위 <br></br>
            <input
            className="franchise-input-modal"
              type="text"
              value={null}
              onChange={(e) => setIngredientUnit(e.target.value)}
            />
          </div>
          <br />
        </div>
        <div>
        <button className='report-add-button' type="submit">추가하기</button>
        {/* 닫기 버튼 추가 */}
        <button className='report-add-button' onClick={onClose}>취소</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;
