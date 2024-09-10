import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PatchUser, fetchUserData } from "./BackendUtils";

export default function EditarCadastro() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	const token = localStorage.getItem("token");

	useEffect(() => {
		const loadUser = async () => {
			const response = await fetchUserData(token);
			if (response.status == 200) {
				setUser(response.data);
			} else if (response.status == 401) {
				localStorage.removeItem("token");
				navigate("/login");
			}
		};
		loadUser();
	}, []);

	const handleUpdate = async () => {
		try {
			let response = await PatchUser(user, token);

			if (response.status == 200) {
				// Adicionar um modal de aviso!! p substituir esse alert.
				alert("Cadastro atualizado com sucesso!");
			} else if (response.status == 401) {
				// Adicionar um modal de aviso!! p substituir esse alert.
				alert("Não foi possivel atualizar o registro. Tente Novamente");
			}

			// Deslogar automaticamente - Obrigar o login novamente
			localStorage.removeItem("token");
			navigate("/login");
		} catch (error) {
			console.error("Erro ao atualizar cadastro:", error);
			alert("Erro ao atualizar cadastro. Verifique o console para mais detalhes.");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	return (
		<div className="min-w-96">
			<div className="border border-gray-300 rounded-lg p-4">
				<div id="clientForm" className="grid place-content-center">
					<form>
						<div className="border-b border-gray-900/10 pb-7">
							<h1 className="text-base relative right-4 font-semibold leading-7 text-gray-900">Editar Cadastro</h1>
							<div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 ">
								<div className="sm:col-span-2 mt-2">
									<label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
										Nome Completo
									</label>
									<input
										type="text"
										name="nome"
										id="nome"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										required
										value={user.nome || ""}
										onChange={handleChange}
									/>
								</div>
								<div className="mt-2 sm:col-start-1">
									<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
										Endereço de Email
									</label>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										required
										value={user.email || ""}
										onChange={handleChange}
									/>
								</div>
								<div className="mt-2">
									<label htmlFor="telefone" className="block text-sm font-medium leading-6 text-gray-900">
										Telefone
									</label>
									<input
										type="tel"
										name="telefone"
										id="telefone"
										autoComplete="tel"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										required
										value={user.telefone || ""}
										onChange={handleChange}
									/>
								</div>
								<div className="mt-2">
									<label htmlFor="CEP" className="block text-sm font-medium leading-6 text-gray-900">
										CEP
									</label>
									<input
										type="text"
										pattern="[0-9]{8}"
										name="CEP"
										id="CEP"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										required
										value={user.CEP || ""}
										onChange={handleChange}
									/>
								</div>
								{/* <div className="mt-2">
										<label htmlFor="senha" className="block text-sm font-medium leading-6 text-gray-900">
											Senha de Login
										</label>
										<input
											type="password"
											name="senha"
											id="senha"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											required
											value={user.senha || ""}
											onChange={handleChange}
										/>
									</div> */}
							</div>
						</div>
						<div className="mt-2 flex items-center justify-end gap-x-6">
							<div
								type="button"
								onClick={handleUpdate}
								className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<Link to="/home">
									<span className="inline-block">Salvar</span>
								</Link>
							</div>

							<button
								type="button"
								className="rounded-md bg-purple-500  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<Link to="/home">
									<span className="inline-block">Cancelar</span>
								</Link>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
