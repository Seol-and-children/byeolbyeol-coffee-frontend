import React, { useState } from 'react';

const ReportReasonComponent = () => {
    const [reporter, setReporter] = useState('');
  
    return <div><strong>신고 내용:</strong> {reporter}</div>;
  };
  
  export default ReportReasonComponent;