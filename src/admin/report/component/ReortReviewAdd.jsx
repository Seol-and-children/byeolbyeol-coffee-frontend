import React, { useState } from "react";
import ReviewModalComponent from "./ReportReviewAddModal";
import ReportIcon from "../../../assets/ReportIcon.svg";

const ReportReviewAdd = ({ addReviewId }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
        {console.log(addReviewId)}
      <button onClick={openModal}>
        <img src={ReportIcon} alt="신고하기" />
        신고하기
      </button>
      {isModalOpen && (
        <ReviewModalComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          getReviewId={addReviewId}
        />
      )}
    </div>
  );
};

export default ReportReviewAdd;
