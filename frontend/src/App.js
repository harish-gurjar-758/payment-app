import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';
import QRScan from './pages/QRScan';
import Recharge from './pages/Recharge';
import History from './pages/History';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <div className="navbar">MyPay</div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/send" element={<Send />} />
          <Route path="/scan" element={<QRScan />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
