// ReviewList.js
import React, { useState } from 'react';

const ReviewList = ({ reviews }) => {
  // 상태 추가
  const [currentPage, setCurrentPage] = useState(1);

  // 최신순으로 정렬
  const sortedReviews = reviews.sort((a, b) => b.date - a.date);

  // 페이지당 리뷰 개수
  const reviewsPerPage = 15;

  // 현재 페이지에 해당하는 리뷰들을 추출
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = sortedReviews.slice(startIndex, endIndex);

  return (
    <div>
      <h2>CAFE REVIEW</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>날짜</th>
            <th>추천수</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((review, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{review.title}</td>
              <td>{review.author}</td>
              <td>{review.date}</td>
              <td>{review.likes}</td>
              <td>{review.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {[...Array(Math.ceil(sortedReviews.length / reviewsPerPage)).keys()].map((page) => (
          <span key={page} onClick={() => setCurrentPage(page + 1)}>
            {page + 1}
          </span>
        ))}
      </div>
      <div className="write-review-button">
        <button>게시글 작성</button>
      </div>
    </div>
  );
};

export default ReviewList;
