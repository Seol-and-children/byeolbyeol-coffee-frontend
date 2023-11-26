import React, { useState } from 'react';

const CheckBoxComponent = () => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  
    return <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />;
  };
  
  export default CheckBoxComponent;