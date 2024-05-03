import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const NextPage = () => {
const navigate = useNavigate();


  const location = useLocation();
  const { key, value } = location.state;
  const { username } = location.state;

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { user_id: username }
    });
    setSocket(newSocket);
    newSocket.on('private_message', (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    return () => newSocket.close();
  }, [username]);

  const handleSend = () => {
    socket.emit('private_message', { recipient_id: key, message });
    setMessage('');
  };


  return (
    <div>
      <h1>Next Page</h1>
      <p>Key: {key}</p>
      <p>Value: {value}</p>
      <p>Username: {username}</p>

      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>
        Send
      </button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div>
        <button onClick={() => {
            navigate('/',{state:{"username":username}});}}>
          Go to Home Page
        </button>
      </div>    
      </div>

    
  );
}

export default NextPage;