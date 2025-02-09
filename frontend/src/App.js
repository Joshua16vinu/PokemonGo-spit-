// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ReportPage from './components/ReportPage';
import HomePage from './components/HomePage';
import CardDetailPage from './components/CardDetailPage';
import Results from './components/Result';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/card/:id" element={<CardDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

