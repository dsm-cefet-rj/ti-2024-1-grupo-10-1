import React, { useState } from 'react';
import logo from '../assets/bike2.jpg';
import lupa from '../assets/lupan.png';
import loja from '../assets/loja.png';
import batePapo from '../assets/batePapo.png';
import ciclista from '../assets/ciclista.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
    <header className='flex flex-col md:flex-row items-center justify-between md:px-0'>
      {/* Logo */}
      <img src={logo} className='w-40 h-auto md:w-48 md:h-auto' alt="Logo" />

      {/* Barra de Pesquisa */}
      <div className='w-full md:w-1/3 flex justify-between items-center bg-white border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 md:mr-0'>
        <input className='w-full focus:outline-none' placeholder="Buscar por modelo, marca..." type="text" />
        <img src={lupa} className='w-6 h-6' alt="Lupa" />
      </div>

      {/* Menu de Navegação para Dispositivos Maiores */}
      <nav className="hidden md:flex items-center gap-7">
        <div className='cursor-pointer flex items-center gap-2'> <img src={loja} alt="Loja" /> <span>Meus Anúncios</span></div>
        <div className='cursor-pointer flex items-center gap-2'><img src={batePapo} alt="Bate Papo" /> <span>Feedback</span></div>
        <div className='cursor-pointer flex items-center gap-2'><img src={ciclista} alt="Ciclista" /> <span>Conta</span></div>
        <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5">Quero Vender</button>
      </nav>

      {/* Botão de Hambúrguer */}
      <button 
        className="md:hidden focus:outline-none flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menu de Hambúrguer para Dispositivos Menores */}
      {menuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center">
          {/* Botão de Fechar */}
          <button 
            className="absolute top-4 right-4 focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Itens do Menu de Hambúrguer */}
          <div className='ml-7 cursor-pointer flex items-center gap-2 mb-4'> 
            <img src={loja} alt="Loja" /> 
            <span className="md:block hidden">Meus Anúncios</span>
          </div>
          <div className='cursor-pointer flex items-center gap-2 mb-4'>
            <img src={batePapo} alt="Bate Papo" /> 
            <span className="md:block hidden">Chat</span>
          </div>
          <div className='cursor-pointer flex items-center gap-2 mb-4'>
            <img src={ciclista} alt="Ciclista" /> 
            <span className="md:block hidden">Conta</span>
          </div>
          <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
            Quero Vender
          </button>
        </div>
      )}
    </header>
    <div className="mt-2 border-b"></div>
  </div>
  )
}

export default Header;
