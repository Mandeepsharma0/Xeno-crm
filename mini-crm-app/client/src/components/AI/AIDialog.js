import React, { useState } from 'react';

function AIDialog({ open, onClose }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  if (!open) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  // Gradient background
  const boxStyle = {
    background: 'linear-gradient(135deg, #ffffff, #e6f7ff)',
    padding: '24px',
    borderRadius: '12px',
    width: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease'
  };

  async function handleSubmit() {
    try {
      const res = await fetch('http://localhost:3001/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      // Extract only the text from candidates -> content -> parts -> text
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response available';
      setResponse(text);
    } catch (error) {
      setResponse(error.toString());
    }
  }

  function handleClose() {
    // Clear content on close
    setPrompt('');
    setResponse('');
    onClose();
  }

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>
        <h2>AI Assistant</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '8px', fontSize: '14px', marginBottom: '12px' }}
          placeholder="Ask about your business..."
        />
        <div>
          <button 
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28A745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Ask 
          </button>
          <button 
            onClick={handleClose}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
        {response && (
          <div 
            style={{
              marginTop: '20px',
              backgroundColor: '#f8f9fa',
              padding: '10px',
              borderRadius: '8px',
              maxHeight: '200px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}
          >
            {response}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIDialog;