
import React, { useState } from 'react';
import './css/ImageUploader.css';

function ImageUploader({ onImageUpload }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      onImageUpload(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-container">
      <h1>Minecraft Texture Pack Creator</h1>
      <div className="upload-container">
        <h2 className="upload-title">Upload PNG files for painting:</h2>
        <input type="file" accept="image/*" onChange={handleImageChange} className="upload-input" />
      </div>
    </div>
  );
}

export default ImageUploader;
