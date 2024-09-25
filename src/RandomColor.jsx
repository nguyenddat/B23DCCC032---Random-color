import React, { useState, useEffect } from 'react';
import './App.css'; 

const RandomColor = () => {
  const [color, setColor] = useState('');
  const [history, setHistory] = useState(['']);
  const [isAutoChanging, setIsAutoChanging] = useState(false);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let newColor = '#';
    for (let i = 0; i < 6; i++) {
      newColor += letters[Math.floor(Math.random() * 16)];
    }
    return newColor;
  };

  const changeBackgroundColor = () => {
    const newColor = generateRandomColor();
    setColor(newColor);
    setHistory((prevHistory) => [...prevHistory, newColor]);
  };

  const undoColor = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setColor(newHistory[newHistory.length - 1]);
    }
  };

  const toggleAutoChange = () => {
    setIsAutoChanging(!isAutoChanging);
  };

  useEffect(() => {
    let intervalId;
    if (isAutoChanging) {
      intervalId = setInterval(changeBackgroundColor, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoChanging]);

  return (
    <div>
      <h1>Random Color</h1>
      <div>
        <button onClick={changeBackgroundColor}>Change Background Color</button>
        <button onClick={undoColor}>Undo</button>
        <button onClick={toggleAutoChange}>
          {isAutoChanging ? 'Stop Auto Change' : 'Start Auto Change'}
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Current Color:</h2>
        <div
          className="color-box"
          style={{ backgroundColor: color }}
        ></div>
        <p>{color}</p>
      </div>
      <div>
        <h2>Color History:</h2>
        <ul className="color-history">
          {history.map((c, index) => (
            <li key={index} style={{ color: c }}>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RandomColor;