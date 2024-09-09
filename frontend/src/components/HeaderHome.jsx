import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/bike2.jpg";
import lupa from "../assets/lupan.png";
import fav from "../assets/fav.png";
import batePapo from "../assets/batePapo.png";
import ciclista from "../assets/ciclista.png";

// Função para verificar a existência do token (essa gambiarra só funciona pq dou f5 automatico no fetchlogin)
const isUserLoggedIn = () => {
	return !localStorage.getItem("token");
};

const HeaderHome = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const isLoggedIn = isUserLoggedIn(); // Verifica se o usuário está logado

	return (
		<div>
			<header className="flex flex-col md:flex-row items-center justify-between pl-0 pr-2">
				{/* Logo clicável */}
				<Link to="/home">
					<img src={logo} className="w-56 h-40 md:w-40 md:h-auto" alt="Logo" />
				</Link>
				
				{/* Menu de Navegação para Dispositivos Maiores */}
				<nav className="hidden md:flex items-center gap-7">
					<Link to={isLoggedIn ? "/favoritos" : "/login"} className="cursor-pointer flex items-center gap-2">
						<img src={fav} alt="Loja" /> <span>Favoritos</span>
					</Link>

					<Link to="/feedback" className="cursor-pointer flex items-center gap-2 mx-2">
						<img src={batePapo} alt="Bate Papo" /> <span>Feedbacks</span>
					</Link>

					<Link to={isLoggedIn ? "/conta" : "/login"} className="cursor-pointer flex items-center gap-2">
						<img src={ciclista} alt="Ciclista" /> <span>Conta</span>
					</Link>

					<Link
						className="text-center text-sm px-3 py-2.5 mx-2 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg"
						to={isLoggedIn ? "/anuncios" : "/login"}
					>
						Quero Anunciar
					</Link>
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
						<button className="absolute top-4 right-4 focus:outline-none" onClick={() => setMenuOpen(false)}>
							<svg className="w-6 h-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>

						{/* Itens do Menu de Hambúrguer */}

						<Link to={isLoggedIn ? "/favoritos" : "/login"} className="cursor-pointer flex items-center gap-2 mb-4">
							<b>Favoritos</b>
						</Link>

						<Link to="/feedback" className="cursor-pointer flex items-center gap-2 mb-4">
							<b>Feedbacks</b>
						</Link>

						<Link to={isLoggedIn ? "/conta" : "/login"} className="cursor-pointer flex items-center gap-2 mb-4">
							<b>Minha conta</b>
						</Link>

						<Link
							to={isLoggedIn ? "/anuncios" : "/login"}
							className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
						>
							Quero Anunciar
						</Link>
					</div>
				)}
			</header>
			<div className="mt-2 border-b"></div>
		</div>
	);
};

export default HeaderHome;
