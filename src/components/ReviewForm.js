// ReviewForm.js
import React, { useState } from 'react';

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에서 실제로 서버에 리뷰를 등록하는 등의 동작을 수행할 수 있습니다.
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목을 입력하세요:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          {/* 사진을 첨부하는 부분 (버튼 또는 파일 업로드 컴포넌트 등을 추가) */}
          <label htmlFor="photo">사진 첨부:</label>
          <input type="file" id="photo" accept="image/*" />
        </div>
        <div>
          <label htmlFor="content">내용을 입력하세요:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onCancel}>
            취소하기
          </button>
          <button type="submit">등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
