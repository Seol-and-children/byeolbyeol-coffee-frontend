// NewPostTitle.js

import React, { useState } from 'react';

const NewPostTitle = ({ onTitleChange }) => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    onTitleChange(event.target.value);
  };

  return (
    <div className="new-post-title">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요"
      />
    </div>
  );
};

export default NewPostTitle;