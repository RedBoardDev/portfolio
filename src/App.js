import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className='app-container'>
                <Routes>
                    <Route path="/" />
                </Routes>
            </div>
        </Router>
    );
};

export default App;