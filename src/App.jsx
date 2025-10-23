import React from 'react';
import Login from './page/Login.jsx';
import Home from './page/Home.jsx';
import EIRUpload from './page/EIRUpload.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/eir-upload" element={<EIRUpload />} />
        
      </Routes>
    </Router>
  );
}

export default App;
