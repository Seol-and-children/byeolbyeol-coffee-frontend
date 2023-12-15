import React, { useState } from "react";
import "./FranchiseFilter.css";

function FranchiseFilter({ franchises, onSelectFranchise, selectedFranchise }) {
  const [isOpen, setIsOpen] = useState(false);
  const filteredFranchises = franchises.filter(
    (franchise) => franchise.processing
  );

  return (
    <div className={`franchise-filter ${isOpen ? "open" : ""}`}>
      <div className="franchise-container">
        {filteredFranchises.map((franchise) => {
          const isSelected = selectedFranchise === franchise.franchiseName;
          const buttonStyle = isSelected
            ? {
                backgroundColor: franchise.franchiseBackColor,
                color: franchise.franchiseFontColor,
              }
            : {};

          return (
            <button
              key={franchise.franchiseId}
              onClick={() => onSelectFranchise(franchise.franchiseName)}
              className={`franchise-button ${isSelected ? "selected" : ""}`}
              style={buttonStyle}
            >
              {franchise.franchiseName}
            </button>
          );
        })}
      </div>
      <button className="franchise-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "접기" : "카페 별 모아보기"}
      </button>
    </div>
  );
}

export default FranchiseFilter;
