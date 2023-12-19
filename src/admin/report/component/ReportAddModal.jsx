import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useSelector } from "react-redux";
import  modalStyles from "../../../User/component/modal.module.css";

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
        className="report-add-modal">
      <form className='report-modal-form' onSubmit={handleSubmit}>
        <div className='report-modal-top'>신고하기</div>
        <div className='report-wrap-modal'>

        <div className='report-modal-text'><strong>게시판</strong> : 레시피 게시판</div>
        <div className='report-modal-text'><strong>신고자</strong> : {authorName}</div>

        <label className="report-modal-label">
          <strong>신고내용</strong> 
          <input type="text" id='reportContent' value={reportReason} onChange={(e) => setReportReason(e.target.value)} />
        </label>
        <br/>

        </div>
        <div className='report-btn-wrap'>
        <button className='report-add-button' type="submit">신고하기</button>
        {/* 닫기 버튼 추가 */}
        <button className='report-add-button' onClick={onClose}>취소</button></div>
      </form>
    </Modal>
    );
  };
  
  export default ModalComponent;