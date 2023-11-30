// ReviewListTable.js

import React from 'react';
import { Link } from 'react-router-dom';

const ReviewListTable = ({ reviews }) => {
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
            <tr key={review.id} className="review-row">
              <td className="review-id">{review.id}</td>
              <td className="review-title">
                <Link to={`/review/${review.id}`}>{review.title}</Link>
              </td>
              <td className="review-author">{review.authorId}</td>
              <td className="review-date">{review.registerTime}</td>
              <td className="review-likes">{review.likesCount}</td>
              <td className="review-views">{review.viewsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="review-list-content">
        {/* 여기에 리뷰 목록 컨텐츠를 표시하는 부분을 추가하세요. */}
        {/* 예: 리뷰 목록의 내용을 나열하는 루프나 다른 컴포넌트 추가 */}
      </div>
    </div>
  );
};

export default ReviewListTable;
