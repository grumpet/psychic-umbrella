// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NextPage from './pages/NextPage';
import UserContext from './components/UserContext';

function App() {
  const [userName, setUserName] = useState(null);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/next" element={<NextPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;