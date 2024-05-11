// DownloadButton.js
import React from 'react';
import JSZip from 'jszip';
import './css/DowloadButton.css';

function DownloadButton({ images }) {
  const handleDownload = () => {
    if (!images || images.length === 0) {
      console.error('No images to download');
      return;
    }

    const zip = new JSZip();
    const paintingFolderPath = 'assets/custom/textures/painting/';
    const paintingJsonFileName = 'painting.json';
    const placeableJsonFileName = 'placeable.json';
    const packMcmetaFileName = 'pack.mcmeta';

// Initialize an array to hold values
let valuesArray = [];

// Loop through the images
images.forEach((image, index) => {
    const imageName = `painting_${index}`;
    const paintingFileName = `${imageName}.png`;
    
    // Add image to the zip file
    zip.folder(paintingFolderPath).file(paintingFileName, image.split(',')[1], { base64: true });

    // Create painting JSON content
    const paintingJsonContent = JSON.stringify({
        asset_id: `custom:${imageName}`,
        height: 2,
        width: 2
    });

    // Add painting JSON file to the zip file
    zip.file(`data/custom/painting_variant/${imageName}.json`, paintingJsonContent);

    // Add custom image name to the values array
    valuesArray.push(`custom:${imageName}`);
});

// Create placeable JSON content with all custom image names
const placeableJsonContent = JSON.stringify({
    values: valuesArray
});

// Add placeable JSON file to the zip file
zip.file(`data/minecraft/tags/painting_variant/${placeableJsonFileName}`, placeableJsonContent);


    // Create pack.mcmeta content
    const packMcmetaContent = JSON.stringify({
      pack: {
        pack_format: 33,
        description: "Custom Paintings Datapack and Texture Pack"
      }
    });

    // Add pack.mcmeta file to the zip file
    zip.file(packMcmetaFileName, packMcmetaContent);

    // Generate and download the zip file
    zip
      .generateAsync({ type: 'blob' })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'texture_pack.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error creating zip file:', error);
      });
  };

  return <a onClick={handleDownload} className='download-button'>Download Texture Pack</a>;
}

export default DownloadButton;
