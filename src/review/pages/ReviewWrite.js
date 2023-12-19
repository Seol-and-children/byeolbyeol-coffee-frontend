import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PostTitle from "../components/ReviewWrite/PostTitle";
import CancelButton from "../components/ReviewWrite/CancelButton";
import SubmitButton from "../components/ReviewWrite/SubmitButton";

import "../css/ReviewWrite.css";

function ReviewWrite() {
  const [reviews, setReviews] = useState([]);
  const [reviewName, setReviewName] = useState("");
  const [content, setContent] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [fileName, setFileName] = useState(""); // 추가: 파일 이름을 state로 관리
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // 유저 정보가 없으면 로그인 페이지로 이동
      alert("로그인 후 이용해주세요.");
      navigate("/users/login");
    }
  }, [user, navigate]);

  const handleNewTitleChange = (title) => {
    setReviewName(title);
  };

  const handleNewContentChange = (content) => {
    setContent(content);
  };

  const handleNewImageChange = (e) => {
    setReviewImage(e.target.files[0]);

    // 파일이 선택되었는지 확인
    if (e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setFileName(fileName);
    } else {
      // 파일이 선택되지 않은 경우 기본 메시지 표시
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
  
    // 파일이 선택되었는지 확인 후, 선택되었을 경우에만 form data에 추가
    if (reviewImage) {
      formData.append("reviewImage", reviewImage);
    }
  
    formData.append(
      "reviewDTO",
      new Blob([JSON.stringify(reviewDTO)], { type: "application/json" })
    );
  
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
      alert("리뷰가 등록되었습니다!");
  
      // 리뷰 목록을 업데이트하고 시간순으로 정렬
      const updatedReviewsResponse = await axios.get(
        "http://localhost:8080/reviews"
      );
      const updatedReviews = updatedReviewsResponse.data;
  
      const sortedReviews = [...updatedReviews].sort(
        (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
      );
  
      setReviews(sortedReviews);
  
      navigate("/reviews");
    } catch (error) {
      console.error("리뷰 등록 실패", error);
      alert("리뷰 등록에 실패하였습니다.");
      navigate("/reviews");
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

export default ReviewWrite;
