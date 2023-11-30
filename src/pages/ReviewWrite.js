// ReviewWrite.js

import React, { useState } from 'react';
import PostTitle from '../components/ReviewWrite/PostTitle';
import NewPostTitle from '../components/ReviewWrite/NewPostTitle';
import NewPostContent from '../components/ReviewWrite/NewPostContent';
import NewPostImage from '../components/ReviewWrite/NewPostImage';
import CancelButton from '../components/ReviewWrite/CancelButton';
import SubmitButton from '../components/ReviewWrite/SubmitButton'; // 추가된 부분

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

  return (
    <div class="container">
      <div class="content">
        <PostTitle />
        <NewPostTitle onTitleChange={handleNewTitleChange} />
        <NewPostImage onImageChange={handleNewImageChange} />
        <NewPostContent onContentChange={handleNewContentChange} />
        <CancelButton />
        <SubmitButton/> {/* 추가된 부분: 등록하기 버튼 */}
        {/* 여기에 다른 컴포넌트들 추가 */}
      </div>
    </div>

  );
};

export default ReviewWrite;
