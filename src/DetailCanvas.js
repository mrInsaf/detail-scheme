import React, { useState, useEffect } from 'react';

const DetailCanvas = ({ edges }) => {
  const [viewBox, setViewBox] = useState('0 0 400 400');

  useEffect(() => {
    calculateAndSetViewBox();
  }, [edges]);

  const calculateAndSetViewBox = () => {
    let minX = 200, maxX = 200, minY = 200, maxY = 200;
    let currentX = 200;
    let currentY = 200;
    let currentAngle = 0;

    edges.forEach(({ length, angle }) => {
      const rad = (Math.PI / 180) * currentAngle;
      const newX = currentX + length * Math.cos(rad);
      const newY = currentY - length * Math.sin(rad);

      // Проверяем минимальные и максимальные координаты
      minX = Math.min(minX, newX);
      maxX = Math.max(maxX, newX);
      minY = Math.min(minY, newY);
      maxY = Math.max(maxY, newY);

      currentX = newX;
      currentY = newY;
      currentAngle += angle;
    });

    // Вычисляем ширину и высоту, которые нужны для viewBox
    const width = maxX - minX;
    const height = maxY - minY;

    // Устанавливаем viewBox с небольшим отступом (по 20px)
    setViewBox(`${minX - 20} ${minY - 20} ${width + 40} ${height + 40}`);
  };

  const renderEdges = () => {
    let path = '';
    let currentX = 200; // стартовая точка X
    let currentY = 200; // стартовая точка Y
    let currentAngle = 0;

    edges.forEach(({ length, angle }) => {
      const rad = (Math.PI / 180) * currentAngle;
      const newX = currentX + length * Math.cos(rad);
      const newY = currentY - length * Math.sin(rad);

      path += `M${currentX},${currentY} L${newX},${newY} `;
      currentX = newX;
      currentY = newY;
      currentAngle += angle;
    });

    return <path d={path} stroke="black" strokeWidth="2" fill="none" />;
  };

  return (
    <svg
      width="400"
      height="400"
      style={{ border: '1px solid black' }}
      viewBox={viewBox} // Используем динамический viewBox
    >
      {renderEdges()}
    </svg>
  );
};

export default DetailCanvas;
