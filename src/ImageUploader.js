// ImageUploader.js
import React, { useState } from 'react';
import './css/ImageUploader.css';

function ImageUploader({ onImageUpload }) {
  const [images, setImages] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index] = {
        dataUrl: reader.result,
        height: '',
        width: ''
      };
      setImages(updatedImages);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    setImages([...images, null]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    
    const updatedImages = images.map((imageData, index) => {
      const widthInput = e.target.querySelector(`.width-input-${index}`);
      const heightInput = e.target.querySelector(`.height-input-${index}`);
      
      return {
        ...imageData,
        width: parseInt(widthInput.value),
        height: parseInt(heightInput.value)
      };
    });

    
    onImageUpload(updatedImages);
  };

  return (
    <div className='panting-container'>
      <h2>Upload PNG files for painting:</h2>
      <form onSubmit={handleSubmit}>
        {images.map((image, index) => (
          <div key={index} className='painting-container'>
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
              className={`upload-input-number width-input-${index}`}
            />
            <span className='text'>x</span>
            <input
              placeholder='Height'
              type="text"
              className={`upload-input-number height-input-${index}`}
            /> <br />
            
          </div>
        ))}
        <button type="submit" onClick={handleAddImage} className='add-input'>Submit Painting</button>
        
      </form>
    </div>
  );
}

export default ImageUploader;
