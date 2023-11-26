import React, { useState } from 'react';

const ReportedNameComponent = () => {
    const [reporter, setReporter] = useState('');
  
    return <div><strong>작성자:</strong> {reporter}</div>;
  };
  
  export default ReportedNameComponent;