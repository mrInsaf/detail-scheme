import React, { useState, useEffect } from 'react';

const DetailCanvas = ({ edges }) => {
  const [viewBox, setViewBox] = useState('0 0 400 400');
  const [fontSize, setFontSize] = useState(16); // Изначальный размер шрифта

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
    const diffX = maxX - minX;
    const diffY = maxY - minY
    const width = diffX;
    const height = diffY;

    const baseFontSize = Math.max(width, height) / 16; // Например, 1/20 от минимального размера
    setFontSize(baseFontSize);
    console.log(`width: ${width}`)
    console.log(`height: ${height}`)
    
    // Устанавливаем viewBox с небольшим отступом (по 20px)
    setViewBox(`${minX - 20} ${minY - 20} ${width + 40} ${height + 40}`);
  };

  const renderEdges = () => {
    let path = '';
    let textElements = []; // Массив для хранения элементов текста
    let currentX = 200; // стартовая точка X
    let currentY = 200; // стартовая точка Y
    let currentAngle = 0;
  
    edges.forEach(({ length, angle }) => {
      const rad = (Math.PI / 180) * currentAngle;
      const newX = currentX + length * Math.cos(rad);
      const newY = currentY - length * Math.sin(rad);
  
      // Добавляем путь
      path += `M${currentX},${currentY} L${newX},${newY} `;
  
      // Добавляем текст на середине линии
      const textX = (currentX + newX) / 2; // Находим среднюю точку для текста
      const textY = (currentY + newY) / 2; // Находим среднюю точку для текста
      const offset = 10;
      const offsetX = offset * Math.cos(rad + Math.PI/2); // Смещение по Y в перпендикулярном направлении
      const offsetY = offset * Math.sin(rad + Math.PI/2); // Смещение по Y в перпендикулярном направлении

      if (length !== 0) {
        const angleForText = currentAngle; // Угол текущей грани

        textElements.push(
          <text 
            key={`text-${currentX}-${currentY}`} 
            x={textX}  // Применяем смещение по X
            y={textY + offsetY}  // Применяем смещение по Y
            textAnchor="middle" 
            className="edge-text" // Класс для стилизации
            transform={`rotate(${-angleForText}, ${textX}, ${textY})`} // Поворот текста
            fontSize={`${fontSize}px`}
          >
            {length}
          </text>
        );
      }

  
      // Обновляем текущие координаты и угол
      currentX = newX;
      currentY = newY;
      currentAngle += angle;
    });
  
    return (
      <>
        <path d={path} stroke="black" strokeWidth="2" fill="none" />
        {textElements} {/* Отображаем все текстовые элементы */}
      </>
    );
  };
  

  return (
    <svg
      width="400"
      height="400"
      style={{ border: '1px solid lightgray' }}
      viewBox={viewBox} // Используем динамический viewBox
    >
      {renderEdges()}
    </svg>
  );
};

export default DetailCanvas;
