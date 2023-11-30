// ReviewListTable.js

import React from 'react';
import { Link } from 'react-router-dom';

const ReviewListTable = ({ reviews }) => {
  return (
    <div className="review-list-table">
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
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td><Link to={`/review/${review.id}`}>{review.title}</Link></td>
              <td>{review.authorId}</td>
              <td>{review.registerTime}</td>
              <td>{review.likesCount}</td>
              <td>{review.viewsCount}</td>
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
