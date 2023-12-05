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
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate로 변경

const ReviewWrite = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);

  // useHistory 대신 useNavigate로 변경
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
      formData.append('reviewImage', newImage);
      formData.append('authorId', '여기에 실제 authorId를 입력하세요'); // 실제 authorId로 교체
      formData.append('reviewName', newTitle);
      formData.append('content', newContent);

      const response = await Axios.post('http://localhost:8080/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('리뷰 등록 성공:', response.data);

      // Display success message (you can replace this with your own logic)
      alert('리뷰가 성공적으로 등록되었습니다.');

      // Redirect to the review list page
      navigate('/review-list');
    } catch (error) {
      console.error('리뷰 등록 실패:', error);
    }
  };

  return (
    <div>
      <PostTitle />
      <NewPostTitle onTitleChange={handleNewTitleChange} />
      <NewPostImage onImageChange={handleNewImageChange} />
      <NewPostContent onContentChange={handleNewContentChange} />
      <CancelButton />
      <SubmitButton onClick={handleSubmit} />
    </div>
  );
};

export default ReviewWrite;
