import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FranchiseModal from './FranchiseUpdateModal';
import FranchiseToggle from './FranchiseToggle';
import FranchiseAdd from './FranchiseAdd';
import FranchiseLogo from './FranchiseLogo';
import '../css/styles.css';

const Franchise = ({ franchise, onClick }) => (
  <div
    id="franchise-bar"
    key={franchise.franchiseId}
    onClick={() => onClick(franchise)}
  >
    <div class="exam-item name">{franchise.franchiseName}</div>
    <div class="exam-item background-color">{franchise.franchiseBackColor}</div>
    <div class="exam-item text-color">{franchise.franchiseFontColor}</div>
    <div class="exam-item tag-image">
      <FranchiseLogo
      franchiseInfo={franchise.franchiseId}
      />
    </div>
  </div>
);

const FranchiseList = () => {
  const [franchises, setFranchises] = useState([]);
  const [selectedFranchises, setSelectedFranchises] = useState(null);

  useEffect(() => {
    axios.get('/option/franchises')
      .then(response => {
        setFranchises(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const ToggleUpdate = (franchiseId, updatedProcessing) => {
    // 처리 완료 후, 해당 프랜차이즈의 'processing' 상태를 업데이트
    setFranchises((prevFranchises) =>
      prevFranchises.map((franchise) =>
        franchise.franchiseId === franchiseId
          ? { ...franchise, processing: updatedProcessing }
          : franchise
      )
    );
  };

  const handleFranchiseClick = (franchise) => {
    setSelectedFranchises(franchise);
  };

  const handleCloseModal = () => {
    setSelectedFranchises(null);
    //모달이 닫힐때 데이터를 다시 불러온다.
    axios.get('/option/franchises')
      .then(response => {
        setFranchises(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="franchise-management">
      <div id="franchise-header">프렌차이즈 관리</div>
      <div id="main-franchise-bar">
        <div class="exam-item name">Name</div>
        <div class="exam-item background-color">배경색상</div>
        <div class="exam-item text-color">글자색상</div>
        <div class="exam-item remove">제거</div>
      </div>
      <div>
        {franchises.map(franchise => (
          <div key={franchise.franchiseId}>
            <div id="franchise-bar">
            <Franchise 
              franchise = {franchise} 
              onClick={handleFranchiseClick}/>
            <div class="exam-item remove">
              <FranchiseToggle
                franchiseId = {franchise.franchiseId}
                processing = {franchise.processing}
                onUpdate={ToggleUpdate}/></div>
            </div>
          </div>
        ))}
      </div>
       {/* 모달 */}
       
       {selectedFranchises && 
       (<FranchiseModal
            isOpen={selectedFranchises !== null} 
            franchiseId={selectedFranchises.franchiseId}
            onClose={handleCloseModal} />
        )}
        <FranchiseAdd onDataUpdate={handleCloseModal}/>
    </div>
    
  );
};

export default FranchiseList;