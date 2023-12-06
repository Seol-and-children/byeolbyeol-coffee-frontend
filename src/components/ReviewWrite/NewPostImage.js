// NewPostImage.js

import React, { useState } from 'react';

const NewPostImage = ({ onImageChange }) => {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    onImageChange(selectedImage);

    // 선택된 파일명을 상태에 저장
    setSelectedFileName(selectedImage ? selectedImage.name : null);
  };

  return (
    <div className="new-post-image-container">
      <label htmlFor="fileInput" className="icon-label">
        <span className="material-symbols-outlined">
          image
        </span>
      </label>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} // 파일 선택 input 숨김
      />
      {selectedFileName && <p>{selectedFileName}</p>}
    </div>
  );
};

export default NewPostImage;
