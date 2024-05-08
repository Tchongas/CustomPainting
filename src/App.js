// App.js
import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import DownloadButton from './DownloadButton';
import './css/App.css';

function App() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
  };

  return (
    <div className='app-container'>
      <h1>Minecraft Custom Painting</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {image && <DownloadButton image={image} />}
    </div>
  );
}

export default App;
