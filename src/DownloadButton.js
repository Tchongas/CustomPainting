// DownloadButton.js
import React from 'react';
import JSZip from 'jszip';

function DownloadButton({ image }) {
  const handleDownload = () => {
    const zip = new JSZip();
    const paintingFolderPath = 'assets/custom/textures/painting/';
    const paintingFileName = 'painting.png';
    const paintingJsonFileName = 'painting.json';
    const placeableJsonFileName = 'placeable.json';
    const packMcmetaFileName = 'pack.mcmeta';
    const imageName = 'painting';

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

    // Create placeable JSON content
    const placeableJsonContent = JSON.stringify({
      values: [`custom:${imageName}`]
    });

    // Add placeable JSON file to the zip file
    zip.file(`data/minecraft/tags/painting_variant/${placeableJsonFileName}`, placeableJsonContent);

    // Create pack.mcmeta content
    const packMcmetaContent = JSON.stringify({
      pack: {
        pack_format: 33,
        description: "Pufferfish paintings for 24w18a"
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

  return <button onClick={handleDownload}>Download Texture Pack</button>;
}

export default DownloadButton;
