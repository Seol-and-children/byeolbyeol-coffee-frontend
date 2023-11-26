import React, { useState } from 'react';

const DivisionComponent= () => {
    const [reporter, setReporter] = useState('');
  
    return <div><strong>구분:</strong> {reporter}</div>;
  };
  
  export default DivisionComponent;