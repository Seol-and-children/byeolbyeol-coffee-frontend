import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useSelector } from "react-redux";
import  styles from "../../../User/component/modal.module.css";

// 모달 상세 내역
const ModalComponent = ({ isOpen, onClose, getRecipeId }) => {
    // 모달 창 내에서의 상태 관리
    // 아직 외부값은 받아오지 않고 Report내에서만 값을 받아옴
    
    const [reportReason, setReportReason] = useState('');
    const [reportCategory, setReportCategory] = useState("레시피 게시판");
    const [processing, setProcessing] = useState(false);
    const [recipeId, setRecipeId] = useState('');
    const user = useSelector((state) => state.user.userData);
    const [authorName, setAuthorName] = useState('');
  
    useEffect(() => {
      userSet();
    }, []);

    //제출 버튼 이벤트 
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Axios를 사용하여 데이터를 삽입하는 부분(Post)
      try {
        const response = await axios.post('/reports/recipe', {
          reportCategory,
          reportReason,
          authorName,
          recipeId
        });
  
        if (response.status === 200) {
          console.log('Report data sent successfully.');
          alert('신고가 성공적으로 완료되었습니다.');
        }
        onClose();
      } catch (error) {
        console.error('Error sending report data:', error);
      }
    };

    const userSet = () => {
      setAuthorName(user.userNickName);
      setRecipeId(getRecipeId);
    };

    return (
      <Modal isOpen={isOpen} onRequestClose={onClose}
        className={styles.modal}>
      <form className='modal-form' onSubmit={handleSubmit}>
        <div className='modal-top'>신고하기</div>
        <div className='wrap-modal'>

        신고 카테고리 : 레시피 게시판<br></br>

        <br/>

        <div>
          신고자: {authorName} <br></br>
          </div>
        <br/>

        <label>
          신고내용 <br></br>
          <input type="text" id='reportContent' value={reportReason} onChange={(e) => setReportReason(e.target.value)} />
        </label>
        <br/>

        </div>

        <button type="submit">신고하기</button>
        {/* 닫기 버튼 추가 */}
        <button onClick={onClose}>취소</button>
      </form>
    </Modal>
    );
  };
  
  export default ModalComponent;