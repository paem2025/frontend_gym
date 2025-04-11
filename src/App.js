import React from 'react';
import Dashboard from './components/Dashboard';
import QRScanner from './components/QRScanner';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/escanear" element={<QRScanner />} />
      </Routes>
    </div>
  );
}

export default App;
