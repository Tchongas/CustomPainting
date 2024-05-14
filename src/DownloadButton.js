// DownloadButton.js
import React from 'react';
import JSZip from 'jszip';
import './css/DowloadButton.css';

function DownloadButton({ images, widths, heights }) {
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
    let valuesArray = [];




images.forEach((image, index) => {
  const imageName = `painting_${index}`;
  const paintingFileName = `${imageName}.png`;

  
  console.log(image);
  if (!image.width || !image.height) {
    console.error('Invalid image dimensions');
    return;
  }
  zip.folder(paintingFolderPath).file(paintingFileName, image.dataUrl.split(',')[1], { base64: true });

  
  const paintingJsonContent = JSON.stringify({
      asset_id: `custom:${imageName}`,
      height: image.height,
      width: image.width
  });

  
  zip.file(`data/custom/painting_variant/${imageName}.json`, paintingJsonContent);


  valuesArray.push(`custom:${imageName}`);
});


const placeableJsonContent = JSON.stringify({
    values: valuesArray
});


zip.file(`data/minecraft/tags/painting_variant/${placeableJsonFileName}`, placeableJsonContent);


    
    const packMcmetaContent = JSON.stringify({
      pack: {
        pack_format: 33,
        description: "Custom Paintings Datapack and Texture Pack"
      }
    });

    
    zip.file(packMcmetaFileName, packMcmetaContent);

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
