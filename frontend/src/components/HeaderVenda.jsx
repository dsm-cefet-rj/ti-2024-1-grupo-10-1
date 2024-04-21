import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importe Link em vez de useHistory
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
					{/* Botão de voltar (desativado) */}

					<button className="absolute top-0 left-0 ml-4 mt-4">
					<Link to="/" className="cursor-pointer">
							<img src={seta} alt="Seta para Esquerda" />
					</Link>
					</button>

					{/* Logo clicável */}
					{showLogo && (
						<Link to="/" className="cursor-pointer">
							<img src={logo} className='w-40 h-50' alt="Logo" />
						</Link>
					)}
				</div>
				{/* Ícone do ciclista clicável */}
				<Link to="/conta" className="cursor-pointer absolute top-0 right-0 mr-4 mt-4">
					<img src={ciclista} alt="Ciclista" />
				</Link>
			</header>

			<div className="mt-2 border-b"></div>
		</div>
	);
};

export default Header;
