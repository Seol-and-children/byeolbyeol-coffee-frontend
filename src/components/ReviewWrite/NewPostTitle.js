import React, { useState } from 'react';

const NewPostTitle = ({ title, onTitleChange }) => (
  <div>
    <label>
      Title:
      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="제목을 입력하세요"
      />
    </label>
  </div>
);

export default NewPostTitle;
