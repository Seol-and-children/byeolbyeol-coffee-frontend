// NewPostContent.js

import React, { useState } from 'react';

const NewPostContent = ({ onContentChange }) => {
  const [content, setContent] = useState('');

  const handleContentChange = (event) => {
    const newContent = event.target.value;
    setContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div className="new-post-content">
      <textarea
        placeholder="내용을 입력하세요."
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default NewPostContent;
