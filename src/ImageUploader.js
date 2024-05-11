import React, { useState } from 'react';
import './css/ImageUploader.css';  

function ImageUploader({ onImageUpload }) {
  const [images, setImages] = useState([]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = reader.result;
      setImages(updatedImages);
      onImageUpload(updatedImages);
      console.log(updatedImages);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    setImages([...images, null]);
  };

  return (
    <div className='app-container'>
      <h2>Upload PNG files for painting:</h2>
      {images.map((image, index) => (
        <div key={index} className='panting-container'>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, index)}
            className="upload-input"
          />
        <h3>Painting size:</h3>
          <input
            placeholder='Width'
            type="text"
            className="upload-input-number"
          />
          <span className='text'>x</span>
          <input
            placeholder='Height'
            type="text"
            className="upload-input-number"
          />
        </div>
      ))}
      <button onClick={handleAddImage} className='plus-button'>+</button>
    </div>
  );
}

export default ImageUploader;