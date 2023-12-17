import React, { useState } from "react";
import ModalComponent from "./ReportAddModal";
import ReportIcon from "../../../assets/ReportIcon.svg";

const ReportAdd = ({ addRecipeId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>
        <img src={ReportIcon} alt="신고하기" />
        신고하기
      </button>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          getRecipeId={addRecipeId}
        />
      )}
    </div>
  );
};

export default ReportAdd;
