import React, { useState } from 'react';

function AIButton({ onClick }) {
  const [hover, setHover] = useState(false);

  const style = {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    padding: '12px 20px',
    borderRadius: '12px',
    backgroundColor: '#FF6F61', // a bright colour
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: hover ? '0 8px 15px rgba(0, 0, 0, 0.3)' : '0 5px 10px rgba(0, 0, 0, 0.2)',
    transform: hover ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    userSelect: 'none'
  };

  return (
    <div 
      style={style} 
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      AI Assistant
    </div>
  );
}

export default AIButton;