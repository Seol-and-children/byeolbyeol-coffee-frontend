import React from "react";

const RadioButtons = ({ options, name, selectedValue, onChange }) => {
  return (
    <div>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtons;
