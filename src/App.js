// App.js
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import DownloadButton from './DownloadButton';
import './css/App.css';

function App() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (uploadedImages) => {
    setImages(uploadedImages);
  };

  return (
    <div className='app-container'>
      <h1>Custom Painting Creator</h1>
      {images.length > 0 && <DownloadButton images={images} />}
      <ImageUploader onImageUpload={handleImageUpload} />
      
    </div>
  );
}

export default App;