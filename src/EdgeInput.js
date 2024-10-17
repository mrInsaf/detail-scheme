import React from 'react';

const EdgeInput = ({ index, length, angle, onChange }) => {
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
    </div>
  );
};

export default EdgeInput;
