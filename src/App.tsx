import React from 'react';
import './App.css';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import enEN from 'antd/locale/en_US';
import Routing from '@enums/Navigation';

// views
import Home from '@views/Home';

const App = () => (
  <ConfigProvider
    locale={enEN}
    theme={{
      token: {
        fontFamily: 'ABeeZee, sans-serif',
      },
    }}
  >
    <Router>
      <Routes>
        <Route path={Routing.HOME} element={<Home />} />
      </Routes>
    </Router>
  </ConfigProvider>
);

export default App;
