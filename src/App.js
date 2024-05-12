// App.js
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import DownloadButton from './DownloadButton';
import './css/App.css';

function App() {
  const [images, setImages] = useState([]);
  const [widths, setWidths] = useState([]);
  const [heights, setHeights] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleImageUpload = (uploadedImages, uploadedWidths, uploadedHeights) => {
    setImages(uploadedImages);
    setWidths(uploadedWidths);
    setHeights(uploadedHeights);
    setFormSubmitted(false);
  };

  return (
    <div className='app-container'>
      <h1>Custom Painting Creator</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {images.length > 0 && <DownloadButton images={images} widths={widths} heights={heights} />}
      
      
    </div>
  );
}

export default App;