import React, { useState, useEffect } from 'react';
import DetailCanvas from './DetailCanvas';
import EdgeInput from './EdgeInput';
import Header from './Components/Header';
import './App.css';

const App = () => {
  const [edges, setEdges] = useState([{ length: 0, angle: 0 }]); // текущие грани
  const [details, setDetails] = useState([]); // список деталей
  const [isLoggedIn, setIsLoggedIn] = useState(false); // статус авторизации
  const [isNewDetail, setIsNewDetail] = useState(false); // флаг для нового чертежа

  const addEdge = () => {
    setEdges([...edges, { length: 0, angle: 0 }]); // добавляем новую грань
  };

  const removeEdge = (index) => {
    const updatedEdges = edges.filter((_, i) => i !== index);
    setEdges(updatedEdges);
  };

  const handleEdgeChange = (index, key, value) => {
    const updatedEdges = [...edges];
    updatedEdges[index][key] = value;
    setEdges(updatedEdges);
  };

  const saveDetail = () => {
    const newDetailId = `${details.length + 1}-1`; // формируем ID
    const newDetail = { id: newDetailId, name: `Деталь ${details.length + 1}`, edges: edges };
    setDetails([...details, newDetail]); // добавляем деталь в список
    setIsNewDetail(false); // закрываем окно чертежа
  };

  const handleDetailClick = (detailId) => {
    const selectedDetail = details.find((detail) => detail.id === detailId);
    if (selectedDetail) {
      setEdges(selectedDetail.edges); // подставляем грани выбранной детали
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    alert('Переход к регистрации');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Аналог onStart: добавляем первую деталь при загрузке компонента
  useEffect(() => {
    if (!isNewDetail) {
      saveDetail();
    }
  }, [isNewDetail]); // выполняется при изменении флага isNewDetail

  const handleAddDetail = () => {
    setIsNewDetail(true); // открываем новый чертеж
    setEdges([{ length: 0, angle: 0 }]); // сбрасываем грани в начальное состояние
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onLogout={handleLogout}
      />
      <div className="content-container">
      <div className="order-info">
          <h2>Номер заказа: 1</h2>
          {!isNewDetail && (
            <button onClick={handleAddDetail}>Добавить деталь</button> // кнопка для создания нового чертежа
          )}
                    <button onClick={saveDetail}>Сохранить деталь</button>
          <h3>Детали в заказе:</h3>
          <ul>
            {details.map((detail) => (
              <li
                key={detail.id}
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                onClick={() => handleDetailClick(detail.id)}
              >
                {detail.name}
              </li>
            ))}
          </ul>
        </div>
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
              onDelete={() => removeEdge(index)}
            />
          ))}
          <button onClick={addEdge}>Добавить грань</button>

        </div>
      </div>
    </div>
  );
};


export default App;
