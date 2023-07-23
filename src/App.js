import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
import HomePage from './pages/Home';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className='app-container'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;