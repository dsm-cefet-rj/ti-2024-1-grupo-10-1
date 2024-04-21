import React, { useState, useEffect } from 'react';
import logo from '../assets/bike2.jpg';
import { Link } from 'react-router-dom';
import seta from '../assets/seta.png';
import ciclista from '../assets/ciclista.png';

const HeaderLogin = () => {


	return (
		<div>
			<header>
				<div >
				{/* Logo clicável */}
				<Link to="/home">
					<img src={logo} className='w-40 h-auto md:w-48 md:h-auto' alt="Logo" />
				</Link>
				</div>
			</header>

			<div className="mt-2 border-b"></div>
		</div>
	);
};

export default HeaderLogin;
