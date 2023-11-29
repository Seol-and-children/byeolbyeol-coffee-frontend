// NewPostImage.js

import React from 'react';

const NewPostImage = ({ onImageChange }) => {
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    onImageChange(selectedImage);
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleImageChange}
      />
      <label htmlFor="fileInput"></label>
    </div>
  );
};

export default NewPostImage;
