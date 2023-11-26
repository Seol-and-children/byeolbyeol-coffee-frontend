import React from "react";

const PhotoUpload = ({ onPhotoSelect }) => {
  return (
    <input type="file" onChange={(e) => onPhotoSelect(e.target.files[0])} />
  );
};

export default PhotoUpload;
