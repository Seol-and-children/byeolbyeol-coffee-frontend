import React from "react";

const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
