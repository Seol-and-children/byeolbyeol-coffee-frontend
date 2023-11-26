import React, { useState } from 'react';

const AuthorNameComponent = () => {
    const [reporter, setReporter] = useState('');
  
    return <div><strong>신고자:</strong> {reporter}</div>;
  };
  
  export default AuthorNameComponent;