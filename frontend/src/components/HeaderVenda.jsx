import React, { useState, useEffect } from 'react';
import logo from '../assets/bike2.jpg';
import seta from '../assets/seta.png';
import ciclista from '../assets/ciclista.png';

const Header = () => {
	const [showLogo, setShowLogo] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			setShowLogo(window.innerWidth >= 430);
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Verificar o tamanho inicial da janela

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div>
			<header className='flex items-center justify-center h-16 md:h-20 lg:h-24'>
				<div className="flex items-center justify-center flex-1">

					<img src={seta} alt="Seta para Esquerda" className=" absolute top-0 left-0 ml-4 mt-4" />
					{showLogo && (
						<img src={logo} className='w-40 h-50' alt="Logo" />
					)}

				</div>
				<img src={ciclista} alt="Ciclista" className="absolute top-0 right-0 mr-4 mt-4" />
			</header>

			<div className="mt-2 border-b"></div>
		</div>
	);
};

export default Header;
