import React, { useState, useEffect } from 'react';
import logo from '../assets/bike2.jpg';
import seta from '../assets/seta.png';
import ciclista from '../assets/ciclista.png';

const HeaderLogin = () => {
  

  return (
    <div>
      <header>
        <div >
        <img src={logo} className='w-40 h-50' alt="Logo" />
        </div>
      </header>

      <div className="mt-2 border-b"></div>
    </div>
  );
};

export default HeaderLogin;
