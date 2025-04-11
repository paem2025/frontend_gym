import React from 'react';
import Dashboard from './components/Dashboard';
import QRScanner from './components/QRScanner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/escanear" element={<QRScanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
