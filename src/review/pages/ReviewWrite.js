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

function ReviewWrite () {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();

  // 가상으로 설정하는 사용자 ID
  const authorId = 5;

  const handleNewTitleChange = (title) => {
    setNewTitle(title);
  };

  const handleNewContentChange = (content) => {
    setNewContent(content);
  };

  const handleNewImageChange = (e) => {
    setReviewImage(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewDTO = {
      reviewName,
      content,
      authorId: 5 // 수정 필요
    }

    const formData = new FormData();
      formData.append('reviewName', newTitle);
      formData.append('authorId', authorId);
      formData.append('content', newContent);
    formData.append("reviewImage", reviewImage);
    formData.append(
      "reviewDTO",
      new Blob([JSON.stringify(reviewDTO)], { type: "application/json" })
    );

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      try {
        const response = await axios.post(
          "http://localhost:8080/reviews",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        alert("리뷰가 등록되었습니다!"); // 성공 알림
        navigate("/reviews"); // 리뷰 전체 보기 페이지로 리디렉션
      } catch (error) {
        console.error("리뷰 등록 실패", error);
        alert("리뷰 등록에 실패하였습니다."); // 실패 알림
        navigate("/reviews"); // 리뷰 전체 보기 페이지로 리디렉션
      }
    };
  
  return (
    <div className="all">
      <PostTitle className="post-title"/>
      <NewPostTitle onTitleChange={handleNewTitleChange} />
      <div className="content">
        <NewPostImage onImageChange={handleNewImageChange} />
        <NewPostContent onContentChange={handleNewContentChange} />
      </div>ㅞ,
      <div className="button-container">
        <CancelButton />
        <SubmitButton onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ReviewWrite;
