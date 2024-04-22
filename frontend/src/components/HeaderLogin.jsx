import React, { useState, useEffect } from 'react';
import logo from '../assets/bike2.jpg';
import { Link } from 'react-router-dom';
import seta from '../assets/seta.png';
import ciclista from '../assets/ciclista.png';

const HeaderLogin = () => {


	return (
		<div>
			<header>
				<div>
					{/* Logo clicável */}
					<Link to="/home">
						<img src={logo} className='sm:w-25 sm:h-20 md:w-25 md:h-20' alt="Logo" />
					</Link>
				</div>
			</header>

			<div className="mt-2 border-b"></div>
		</div>
	);
};

export default HeaderLogin;
