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

const ReviewWrite = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);

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
      formData.append('reviewDTO', JSON.stringify({ title: newTitle, content: newContent }));

      const response = await Axios.post('http://localhost:8080/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('리뷰 등록 성공:', response.data);
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
