// ReviewListTable.js

import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ReviewListTable = ({ reviews }) => {
  if (!reviews || !Array.isArray(reviews)) {
    return <div className="review-list-table">리뷰가 없습니다.</div>;
  }

  return (
    <div className="review-list-table">
      <table className="review-table">
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
          {reviews.map(review => (
            <tr key={review.reviewId} className="review-row">
              <td className="review-id">{review.reviewId}</td>
              <td className="review-title">
                <Link to={`/reviews/${review.reviewId}`}>{review.reviewName}</Link>
              </td>
              <td className="review-author">{review.userNickname}</td>
              <td className="review-date">{formatDate(review.registerTime)}</td>
              <td className="review-likes">{review.likesCount}</td>
              <td className="review-views">{review.viewsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewListTable;
