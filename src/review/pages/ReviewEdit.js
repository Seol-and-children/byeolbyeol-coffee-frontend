// ReviewEdit.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostTitleEdit from "../components/ReviewWrite/PostTitleEdit";
import CancelButton from "../components/ReviewWrite/CancelButton";
import SubmitButton from "../components/ReviewWrite/SubmitButton";

import "../css/ReviewWrite.css";

function ReviewEdit() {
  const { reviewId } = useParams();
  const [review, setReview] = useState({});
  const [reviewName, setReviewName] = useState("");
  const [content, setContent] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reviews/${reviewId}`
        );
        setReview(response.data);
        setReviewName(response.data.reviewName);
        setContent(response.data.content);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };

    fetchReviewDetails();
  }, [reviewId]);

  const handleNewTitleChange = (title) => {
    setReviewName(title);
  };

  const handleNewContentChange = (content) => {
    setContent(content);
  };

  const handleNewImageChange = (e) => {
    setReviewImage(e.target.files[0]);

    if (e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setFileName(fileName);
    } else {
      setFileName("");
    }
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
    if (reviewImage) {
      formData.append("reviewImage", reviewImage);
    }
    formData.append(
      "reviewDTO",
      new Blob([JSON.stringify(reviewDTO)], { type: "application/json" })
    );
  
    try {
      await axios.put(`http://localhost:8080/reviews/${reviewId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("리뷰가 수정되었습니다!");
  
      navigate(`/reviews/${reviewId}`);
    } catch (error) {
      console.error("리뷰 수정 실패", error);
      alert("리뷰 수정에 실패하였습니다.");
    }
  };

  return (
    <div className="all">
      <form onSubmit={handleSubmit}>
        <PostTitleEdit className="post-title" />
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
                style={{ display: "none" }}
              />
              <p id="fileName">{fileName}</p>
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

export default ReviewEdit;