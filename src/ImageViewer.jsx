import React from 'react';

function ImageViewer({ imageUrl }) {
  return (
    <div>
      <img src={imageUrl} alt="Image" style={{ maxWidth: '100%', maxHeight: '100%' }}/>
    </div>
  );
}

export default ImageViewer;
