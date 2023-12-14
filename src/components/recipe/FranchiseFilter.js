import React, { useState } from "react";
import "./FranchiseFilter.css";

function FranchiseFilter({ franchises, onSelectFranchise, selectedFranchise }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "접기" : "카페 별 모아보기"}
      </button>
      {isOpen && (
        <div>
          {franchises.map((franchise) => (
            <button
              key={franchise.franchiseId}
              onClick={() => onSelectFranchise(franchise.franchiseName)}
              className={`franchise-button ${
                selectedFranchise === franchise.franchiseName ? "selected" : ""
              }`}
            >
              {franchise.franchiseName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FranchiseFilter;
