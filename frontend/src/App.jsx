import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './pages/Home';
import Bike from './pages/Bike';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import CadastroCliente from './pages/CadastroCliente';
import MenuFeedback from './components/MenuFeedback';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/bike" element={<Bike />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu-feedback" element={<MenuFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
