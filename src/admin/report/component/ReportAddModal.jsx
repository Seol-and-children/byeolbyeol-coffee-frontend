import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

// 모달 상세 내역
const ModalComponent = ({ isOpen, onClose, onSubmit }) => {
    // 모달 창 내에서의 상태 관리
    // 아직 외부값은 받아오지 않고 Report내에서만 값을 받아옴
    const [reportedName, setReportedName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [reportReason, setReportReason] = useState('');
    const [reportedContent, setReportedContent] = useState('');
    const [reportTime, setReportTime] = useState('');
    const [contentTitle, setContentTitle] = useState('');
    const [processing, setProcessing] = useState(true);
  
    //제출 버튼 이벤트 
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Axios를 사용하여 데이터를 삽입하는 부분(Post)
      try {
        const response = await axios.post('/reports', {
          reportedName,
          authorName,
          reportReason,
          reportedContent,
          reportTime,
          contentTitle,
          processing,
        });
  
        if (response.status === 200) {
          console.log('Report data sent successfully.');
        }
        onClose();
      } catch (error) {
        console.error('Error sending report data:', error);
      }
    };

    return (
      <Modal isOpen={isOpen} onRequestClose={onClose}
        className='custom-modal'>
      <form className='modal-form' onSubmit={handleSubmit}>
        <div className='modal-top'>신고하기</div>
        <div className='wrap-modal'>

      <label>
          제목 <br></br>
          <input type="text" value={contentTitle} onChange={(e) => setContentTitle(e.target.value)} />
        </label>
        <br/>

        <label>
          작성자 <br></br>
          <input type="text" value={reportedName} onChange={(e) => setReportedName(e.target.value)} />
        </label>
        <br/>

        <label>
          신고자 <br></br>
          <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
        </label>
        <br/>

        <label>
          신고내용 <br></br>
          <input type="text" value={reportReason} onChange={(e) => setReportReason(e.target.value)} />
        </label>
        <br/>

        <label>
          신고당한 내용 <br></br>
          <textarea value={reportedContent} onChange={(e) => setReportedContent(e.target.value)} />
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