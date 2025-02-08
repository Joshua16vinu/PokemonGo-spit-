import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';  // Import HomePage component
import ReportPage from './ReportPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Home Page Route */}
        <Route path="/home" element={<HomePage />} />

        {/* Report Page Route */}
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
