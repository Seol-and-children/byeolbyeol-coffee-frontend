import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../css/styles.css';

// 모달 상세 내역
const FranchiseModal = ({ isOpen, onClose, franchiseId }) => {
    // 모달 창 내에서의 상태 관리
    const [franchiseName, setFranchiseName] = useState('');
    const [franchiseBackColor, setFranchiseBackColor] = useState('');
    const [franchiseFontColor, setFranchiseFontColor] = useState('');
    const [franchiseImage, setFranchiseImage] = useState('');

    useEffect(() => {
      axios.get(`/option/franchises/${franchiseId}`)
        .then(response => {
            setFranchiseName(response.data.franchiseName);
            setFranchiseBackColor(response.data.franchiseBackColor);
            setFranchiseFontColor(response.data.franchiseFontColor);
            setFranchiseImage(response.data.franchiseImage);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, [franchiseId]);
  
    //제출 버튼 이벤트 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Axios를 사용하여 데이터를 삽입하는 부분(Post)
      try {
        const response = await axios.put(`/option/franchises/info/${franchiseId}`, {
            franchiseName,
            franchiseBackColor,
            franchiseFontColor,
            franchiseImage
        });
  
        if (response.status === 200) {
          console.log('data sent successfully.');
          onClose();
        }
        onClose();
      } catch (error) {
        console.error('Error sending data:', error);
      }
    };

    return (
      <Modal 
        className='custom-modal'
        isOpen={isOpen} 
        onRequestClose={onClose}>
      <form className='modal-form' onSubmit={handleSubmit}>
        <div className='modal-top'>프렌차이즈 관리</div>
        <div className='wrap-modal'>
        <label>
        프렌차이즈 이름 <br></br>
          <input type="text" value={franchiseName} onChange={(e) => setFranchiseName(e.target.value)} />
        </label>
        <br/>

        <label>
        백 컬러 <br></br>
          <input type="text" value={franchiseBackColor} onChange={(e) => setFranchiseBackColor(e.target.value)} />
        </label>
        <br/>

        <label>
        폰트 컬러 <br></br>
          <input type="text" value={franchiseFontColor} onChange={(e) => setFranchiseFontColor(e.target.value)} />
        </label>
        <br/>

        </div>

        {/* <label>
        franchiseFontColor:
          <input type="text" value={franchiseImage} onChange={(e) => setFranchiseImage(e.target.value)} />
        </label>
        <br/> */}

        <button type="submit">수정하기</button>
        {/* 닫기 버튼 추가 */}
        <button onClick={onClose}>취소</button>
        
      </form>
    </Modal>
    );
  };
  
  export default FranchiseModal;