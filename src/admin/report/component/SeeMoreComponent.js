import React, { useState } from 'react';

const SeeMoreComponent = () => {
    const [reporter, setReporter] = useState('');
  
    return <div><strong>더보기</strong> {reporter}</div>;
  };