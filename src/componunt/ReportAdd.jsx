import React, { useState } from 'react';
import ModalComponent from './ReportModal';

{/*신고 버튼(모달 오픈)컴포넌트*/}
const ReportAdd = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };

      const closeModal = () => {
        setModalOpen(false);
      };

      return (
        <div>
          <button onClick={openModal}>Open Modal</button>
          {isModalOpen && <ModalComponent isOpen={isModalOpen} onClose={closeModal} />}
        </div>
    );
};

export default ReportAdd;