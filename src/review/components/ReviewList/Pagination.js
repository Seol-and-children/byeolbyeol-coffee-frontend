// Pagination.js

import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ currentPage, totalPages }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPageToShow = 5;

    if (totalPages <= totalPageToShow) {
      // 페이지가 5개 이하인 경우 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 페이지가 6개 이상인 경우 현재 페이지 중심으로 앞뒤 5개 표시
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link to={`/reviews?page=${currentPage - 1}`}>&lt;</Link>
      )}

      {getPageNumbers().map((pageNumber) => (
        <Link
          key={pageNumber}
          to={`/reviews?page=${pageNumber}`}
          className={pageNumber === currentPage ? 'active' : ''}
        >
          {pageNumber}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link to={`/reviews?page=${currentPage + 1}`}>&gt;</Link>
      )}
    </div>
  );
};

export default Pagination;
