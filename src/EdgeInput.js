import React from 'react';
import ImageButton from './Components/ImageButton';
import cancelIcon from './static/icons/close.png'

const EdgeInput = ({ index, length, angle, onChange, onDelete }) => {

  return (
    <div className="edge-input">
      <h3>Edge {index + 1}</h3>
      <label>
        Length: 
        <input
          type="number"
          value={length}
          onChange={(e) => onChange(index, 'length', parseFloat(e.target.value))}
        />
      </label>
      <label>
        Angle: 
        <input
          type="number"
          value={angle}
          onChange={(e) => onChange(index, 'angle', parseFloat(e.target.value))}
        />
      </label>
      <ImageButton 
        onClick={onDelete} 
        imgSrc={cancelIcon} 
        altText="My Button Image" 
      />
    </div>
  );
};

export default EdgeInput;
