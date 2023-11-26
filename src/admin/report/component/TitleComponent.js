import React, { useState } from 'react';

const TitleComponent = () => {
    const [reporter, setReporter] = useState('');
  
    return <div><strong>제목:</strong> {reporter}</div>;
  };
  
  export default TitleComponent;