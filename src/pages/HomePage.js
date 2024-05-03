import React, { useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useNavigate ,} from 'react-router-dom';

function HomePage() {
const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [connectedUsers, setConnectedUsers] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  const getConnectedUsers = (userName) => {
    axios.get('http://localhost:5000/get_connected_users',{
        params: {
            user_id: userName
        }
        
    })
      .then(response => {
        setConnectedUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  

  const handleClick = () => {
    if (userName !== '' && !isConnected) {
      const socket = io('ws://localhost:5000', {
        query: { user_id: userName }
      });
      socket.on('connect', () => {
        console.log('Connected');
        getConnectedUsers(userName);
        setIsConnected(true);
      });
      socket.on('disconnect', () => {
        console.log('Disconnected');
        setIsConnected(false);
      });
 
    } else {
      console.log('Please enter a username before connecting.');
    }
  };

  return (
    <div>
    <h1>Home Page</h1>
    <p>Username: {userName}</p>

      <input
        type="text"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        placeholder="User Name"
        disabled={isConnected}
      />
      <button onClick={handleClick}>
        Connect
      </button>
      <ul>
        {Object.entries(connectedUsers).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
            <button onClick={() => {
      navigate('/next', { state: { key: key, value: value ,"username":userName} });
    }}>
    send message to {key}
    </button>

          </li>
          
          
        ))}
      </ul>
      {isConnected && (
  <button onClick={() => getConnectedUsers(userName)}>
    Refresh Connected Users
  </button>
)}
    </div>
  );
}

export default HomePage;



