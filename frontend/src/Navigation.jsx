import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">MenuVendas</Link></li>
        <li><Link to="/CadastroCliente">CadastroCliente</Link></li>
        <li><Link to="/Login">Login</Link></li>
        <li><Link to="/Feedback">Feedback</Link></li>
        <li><Link to="/Bike">MenuCompras</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
