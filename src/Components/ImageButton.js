import React from 'react';

const ImageButton = ({ onClick, imgSrc, altText }) => {
  return (
    <button onClick={onClick} style={{ border: 'none', background: 'none', padding: 0, marginTop: 0}}>
      <img src={imgSrc} alt={altText} width="16" height="16" />
    </button>
  );
};

export default ImageButton;