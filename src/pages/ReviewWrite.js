// ReviewWrite.js

import React, { useState } from 'react';
import Axios from 'axios';
import PostTitle from '../components/ReviewWrite/PostTitle';
import NewPostTitle from '../components/ReviewWrite/NewPostTitle';
import NewPostContent from '../components/ReviewWrite/NewPostContent';
import NewPostImage from '../components/ReviewWrite/NewPostImage';
import CancelButton from '../components/ReviewWrite/CancelButton';
import SubmitButton from '../components/ReviewWrite/SubmitButton';
import '../css/ReviewWrite.css';
import { useNavigate } from 'react-router-dom';

const ReviewWrite = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();

  const handleNewTitleChange = (title) => {
    setNewTitle(title);
  };

  const handleNewContentChange = (content) => {
    setNewContent(content);
  };

  const handleNewImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('reviewDTO', JSON.stringify({
        "reviewName": newTitle,
        "authorId": "082a2e9c-8779-11ee-ae8d-201a06c67abc",
        "content": newContent,
        "likesCount": 0,
        "viewsCount": 0
      }));
  
      formData.append('reviewImage', newImage);
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const response = await Axios.post('http://localhost:8080/reviews', formData, config);
  
      console.log('리뷰 등록 성공:', response.data);
  
      // Display success message (you can replace this with your own logic)
      alert('리뷰가 성공적으로 등록되었습니다.');
  
      // Redirect to the review list page
      navigate('/review-list');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
  
      // 서버 응답 확인
      if (error.response) {
        console.error('서버 응답:', error.response.data);
      }
    }
  };

  return (
    <div>
      <PostTitle />
      <NewPostTitle onTitleChange={handleNewTitleChange} />
      <NewPostImage onImageChange={handleNewImageChange} />
      <NewPostContent onContentChange={handleNewContentChange} />
      <CancelButton />
      <SubmitButton onSubmit={handleSubmit} /> {/* onSubmit 함수를 전달합니다. */}
    </div>
  );
};

export default ReviewWrite;
