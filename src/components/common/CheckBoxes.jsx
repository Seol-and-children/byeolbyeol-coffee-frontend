import React from "react";

const CheckBoxes = ({ options, selectedValues, onChange }) => {
  return (
    <div>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="checkbox"
            name={option.value}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckBoxes;
