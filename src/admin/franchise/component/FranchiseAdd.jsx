import React, { useState } from 'react';
import AddModal from './FranchiseAddModal';

{/*추가 버튼(모달 오픈)컴포넌트*/}
const FranchiseAdd = ({ onDataUpdate }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };

      const closeModal = () => {
        setModalOpen(false);
      };

      const handleSubmit = async () => {
        await onDataUpdate();
        closeModal();
      };

      return (
        <div>
          <button className='franchise-add-btn' onClick={openModal}>추가</button>
          {isModalOpen && <AddModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit}/>}
        </div>
    );
};

export default FranchiseAdd;