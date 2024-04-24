import React, { useState, useEffect } from 'react'
import useUserStore from './UserUtils';
import { Link } from 'react-router-dom';
import { fetchUsers } from './BackendUtils';


const BarraLogin = () => {

	const [users, setUsers] = useState([]);

	const { updateNome, updateEmail, updateCep, setLoggedAccount, setUserId, setUserFavs } = useUserStore((state) => ({
		updateNome: state.updateNome,
		updateEmail: state.updateEmail,
		updateCep: state.updateCep,
		setLoggedAccount: state.setLoggedAccount,
		setUserId: state.updateId,
		setUserFavs: state.updateFavs
	}));


	/* NÃO APAGAR ESSE CÓDIGO
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get('http://localhost:3000/users');
				if (response.status == 200) setUsers(response.data);
			} catch (error) {
				console.error('Erro ao buscar lista de usuarios:', error);
			}
		};
		
		fetchUsers();
	}, []);
	*/

	useEffect(() => {
		fetchUsers(setUsers);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		let email = document.getElementById("email").value;
		let senha = document.getElementById("pass").value;

		// Verificar se os dados coincidem com algum usuário
		let user_found = users.filter(usuario => { return usuario.email === email && usuario.senha === senha });

		if (user_found.length != 1) {
			// Deu merda, mais de um usuario com mesmas credenciais
			console.log("Algo deu errado");
		} else {
			user_found = user_found[0];

			console.log(user_found);
			setUserId(user_found.id);

			updateNome(user_found.nome);
			updateEmail(user_found.email);
			updateCep(user_found.CEP);
			setUserFavs(user_found.FavCollection);

			setLoggedAccount(true);
			// console.log(user);
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
							<div onClick={handleSubmit}>
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
	)
}

export default BarraLogin
