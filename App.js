// App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to your backend
const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', {
        message,
        time: new Date().toLocaleTimeString(),
      });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Real-time Chat</h2>
      <div className="border h-64 overflow-y-scroll mb-4 p-2 bg-gray-100 rounded">
        {chat.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <span>{msg.message}</span>
            <span className="text-sm text-gray-500 ml-2">{msg.time}</span>
          </div>
        ))}
      </div>
      <input
        className="border rounded p-2 w-full mb-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Send
      </button>
    </div>
  );
}

export default App;
