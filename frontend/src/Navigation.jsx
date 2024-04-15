import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/CadastroCliente">Cadastro Cliente</Link></li>
        <li><Link to="/Login">Login</Link></li>
        <li><Link to="/Feedback">Feedback</Link></li>
        <li><Link to="/Anuncios">Anunciar</Link></li>
        <li><Link to="/Conta">Minha Conta</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
