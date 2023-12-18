import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

import PostTitle from '../components/ReviewWrite/PostTitle';
import CancelButton from '../components/ReviewWrite/CancelButton';
import SubmitButton from '../components/ReviewWrite/SubmitButton';

import '../css/ReviewWrite.css';
import { useNavigate } from 'react-router-dom';

function ReviewWrite() {
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState('');
  const [content, setContent] = useState('');
  const [reviewImage, setReviewImage] = useState(null);
  const user = useSelector((state) => state.user.userData);

  const navigate = useNavigate();

  const handleNewTitleChange = (title) => {
    setReviewName(title); // 수정된 부분: title을 사용하여 setReviewName 호출
  };

  const handleNewContentChange = (content) => {
    setContent(content);
  };

  const handleNewImageChange = (e) => {
    setReviewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = user ? user.userId : null;
  const reviewDTO = {
    reviewName,
    content,
    authorId: userId,
  };

  const formData = new FormData();
  formData.append('reviewImage', reviewImage);
  formData.append(
    'reviewDTO',
    new Blob([JSON.stringify(reviewDTO)], { type: 'application/json' })
  );

  try {
    const response = await axios.post('http://localhost:8080/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log(response.data);
    alert('리뷰가 등록되었습니다!');

    // Fetch the updated list of reviews and sort them by time
    const updatedReviewsResponse = await axios.get('http://localhost:8080/reviews');
    const updatedReviews = updatedReviewsResponse.data;

    const sortedReviews = [...updatedReviews].sort(
      (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
    );
    
    setReviews(sortedReviews);

    navigate('/reviews');
  } catch (error) {
    console.error('리뷰 등록 실패', error);
    alert('리뷰 등록에 실패하였습니다.');
    navigate('/reviews');
  }
};

  return (
    <div className="all">
      <form onSubmit={handleSubmit}>
        <PostTitle className="post-title" />
        <div className="new-post-title">
          <input
            type="text"
            value={reviewName}
            onChange={(e) => handleNewTitleChange(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="content">
          <div className="new-post-image-container">
            <label htmlFor="fileInput" className="icon-label">
              <span className="material-symbols-outlined">image</span>
            </label>
            <div className="file-info">
              <input
                type="file"
                onChange={handleNewImageChange}
                id="fileInput"
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <div className="new-post-content">
            <textarea
              value={content}
              onChange={(e) => handleNewContentChange(e.target.value)}
              placeholder="내용을 입력하세요."
            />
          </div>
        </div>
        <div className="button-container">
          <CancelButton />
          <SubmitButton onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default ReviewWrite;