import React from "react";
import "../../css/ReviewList.css";
import FirstPageIcon from "../../../assets/FirstPage.svg";
import LastPageIcon from "../../../assets/LastPage.svg";

const Pagination = ({
  reviewsPerPage,
  totalReviews,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const lastPageNumber = Math.ceil(totalReviews / reviewsPerPage);

  for (let i = 1; i <= lastPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="review-pagination">
        {currentPage > 1 && (
          <li className="review-page-item">
            <a
              href={`#page1`}
              onClick={() => paginate(1)}
              className="review-page-link"
            >
              <img src={FirstPageIcon} alt="첫 페이지" />
            </a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`review-page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              href={`#page${number}`}
              onClick={() => paginate(number)}
              className="review-page-link"
            >
              {number}
            </a>
          </li>
        ))}
        {currentPage < lastPageNumber && (
          <li className="review-page-item">
            <a
              href={`#page${lastPageNumber}`}
              onClick={() => paginate(lastPageNumber)}
              className="review-page-link"
            >
              <img src={LastPageIcon} alt="마지막 페이지" />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
