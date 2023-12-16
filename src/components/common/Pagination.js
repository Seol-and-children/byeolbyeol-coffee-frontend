import React, { useState } from "react";
import "./Pagination.css";
import FirstPageIcon from "../../assets/FirstPage.svg";
import LastPageIcon from "../../assets/LastPage.svg";

const Pagination = ({
  recipesPerPage,
  totalRecipes,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  const lastPageNumber = Math.ceil(totalRecipes / recipesPerPage);

  for (let i = 1; i <= lastPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <a onClick={() => paginate(1)} className="page-link">
              <img src={FirstPageIcon} alt="첫 페이지" />
            </a>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        {currentPage < lastPageNumber && (
          <li className="page-item">
            <a onClick={() => paginate(lastPageNumber)} className="page-link">
              <img src={LastPageIcon} alt="마지막 페이지" />
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
