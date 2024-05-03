import React from 'react';
import { useLocation } from 'react-router-dom';

const NextPage = () => {
  const location = useLocation();
  const { key, value } = location.state;
  const { username } = location.state;


  return (
    <div>
      <h1>Next Page</h1>
      <p>Key: {key}</p>
      <p>Value: {value}</p>
      <p>Username: {username}</p>
    </div>
  );
}

export default NextPage;