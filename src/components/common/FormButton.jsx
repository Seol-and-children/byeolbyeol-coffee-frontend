import React from "react";

const FormButton = ({ label, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default FormButton;
