// NewPostImage.js

import React, { useState } from 'react';

const NewPostImage = ({ onImageChange }) => {
  const [selectedFileName, setSelectedFileName] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const fileName = selectedImage ? selectedImage.name : null;
  
    onImageChange(selectedImage);
    setSelectedFileName(fileName);
  };

  return (
    <div className="new-post-image-container">
      <label htmlFor="fileInput" className="icon-label">
        <span className="material-symbols-outlined">
          image
        </span>   
      </label>
      <div className="file-info">
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        {selectedFileName && <p>{selectedFileName}</p>}
      </div>
    </div>
  );
};

export default NewPostImage;
