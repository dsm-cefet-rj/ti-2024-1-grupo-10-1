import React, { useState, useEffect } from "react";
import useUserStore from "./UserUtils";
import { Link } from "react-router-dom";
import { LoginUser } from "./BackendUtils";

const BarraLogin = () => {
	
	const { updateNome, updateEmail, updateCep, setLoggedAccount, setUserId, setUserFavs, updateTel, } = useUserStore((state) => ({
		updateNome: state.updateNome,
		updateEmail: state.updateEmail,
		updateCep: state.updateCep,
		setLoggedAccount: state.setLoggedAccount,
		setUserId: state.updateId,
		setUserFavs: state.updateFavs,
		updateTel: state.updateTel,
	}));

	const handleLogin = async () => {
		try {

			let email = document.getElementById("email").value;
			let senha = document.getElementById("pass").value;

			/*
				Estrut. de uma request correta:
				{status: true, token: "token", data: { dados do usuario } }
			*/
			let response = LoginUser(email, senha);

			if (!response.status) {
				// Algo deu errado na requisição
			} else {
				console.log(response);
				alert(JSON.stringify(response));
				
				// Melhor forma? Alternativas?
				localStorage.setItem("token", response.token);
				// Só consigo verificar a chegada do token pelo registro de request - Como vejo que armazeno o token?

				updateNome(response.data.nome);
				updateCep(response.data.CEP);
				updateEmail(response.data.email);
				updateTel(response.data.telefone);
				setUserFavs(response.data.FavIds);
				// Não atualiza o estado corretamente. Bloqueia o acesso as seções com restrição (Meus Anuncios, Favoritos, Meus Dados)
				setLoggedAccount(true);

				console.log("Usuario logado com sucesso!");

				// Nenhum desses conosle.log() aparece devido ao redirecionamento... o que fazer?
			}
		} catch (error) {
			// Tratar os erros
			console.error("Erro ao tentar fazer login:",
				error.response ? error.response.data : error.message
			);
		}
	};

	return (
		<div className="min-h-screen min-w-fit bg-gray-100 flex flex-col justify-center sm:py-10 border border-gray-300">
			<div className="p-5 xs:p-0 mx-auto md:w-full md:max-w-md bg-white border border-gray-300 rounded-lg">
				<h1 className="text-center text-2xl mb-5">Acesse sua conta</h1>
				<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-300 border boder-gray-300">
					<div className="px-7 pb-7 pt-5">
						<form>

							<label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
							<input id="email" type="email" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required />

							<label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
							<input id="pass" type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" required />
							<div onClick={handleLogin}>
								<Link to="/home" className='className="transition duration-200 bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block'>

									<p className="inline-block mr-2">
										Login
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
										</svg>
									</p>

								</Link>
							</div>
						</form>


					</div>

					<div className="text-center">
						<button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
							<Link to="/cadastro-cliente">
								<span className="inline-block ml-1">Não tem uma conta? Cadastre-se</span>
							</Link>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BarraLogin;
