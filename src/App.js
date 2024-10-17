import React, { useState } from 'react';
import DetailCanvas from './DetailCanvas';
import EdgeInput from './EdgeInput';
import './App.css';

const App = () => {
  const [edges, setEdges] = useState([{ length: 100, angle: 0 }]); // стартовая грань

  const handleEdgeChange = (index, key, value) => {
    const updatedEdges = [...edges];
    updatedEdges[index][key] = value;
    setEdges(updatedEdges);
  };

  const addEdge = () => {
    setEdges([...edges, { length: 100, angle: 0 }]); // добавляем новую грань с начальными параметрами
  };

  return (
    <div className="app">
      <div className="canvas">
        <DetailCanvas edges={edges} />
      </div>
      <div className="controls">
        {edges.map((edge, index) => (
          <EdgeInput
            key={index}
            index={index}
            length={edge.length}
            angle={edge.angle}
            onChange={handleEdgeChange}
          />
        ))}
        <button onClick={addEdge}>Add Edge</button>
      </div>
    </div>
  );
};

export default App;
