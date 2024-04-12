/*
  This example requires some changes to your config:
  - tailwind.config.js
	module.exports = {
		plugins: [ require('@tailwindcss/forms'),],
	}

	Além disso:
	frontend$ npm install @tailwindcss/forms
	frontend$ npm i @heroicons/react

	Fonte: https://tailwindui.com/components/application-ui/forms/form-layouts
	Componente de Interesse: https://tailwindui.com/components/application-ui/navigation/pagination
*/

import React, { useState } from 'react';
import logo from "../assets/bike2.jpg"
import { create } from 'zustand';


export default function FormCliente() {

	const useClienteStore = create((set) => ({
		clientes: [],
		addCliente: (cliente) => set((state) => ({
			clientes: [...state.clientes, cliente]
		}))
	}));

	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [cep, setCep] = useState('');

	const addCliente = useClienteStore((state) => state.addCliente);

	const handleSubmit = (e) => {

		e.preventDefault();

		// Crie um objeto com os dados do cliente
		const novoCliente = {
			nome,
			email,
			cep
		};

		// Chame a função para adicionar o cliente à lista
		addCliente(novoCliente);

		// // Limpe os campos após o envio
		setNome('');
		setEmail('');
		setCep('');
	};

	return (

		<div className='min-w-96'>
			<header className='bg-purple-500 p-2 flex justify-between items-center'>
				{/* Título */}
				<h1 className="text-white text-2xl">Meu Site</h1>

				<img src={logo} alt="Logo" className="w-14 h-10 rounded-full" />
			</header>
			<br />

			<div id="clientForm" className="grid place-content-center">
				<form onSubmit={handleSubmit}>

					{
						/* Ideia:
						Criar um Form que Extraia info do cliente como:
							- Nome Completo
							- CPF
							- Email Válido para verificação
							- Informações de Localidade (CEP/Endereço)
		
						*/

						// Pendencias:
						// Melhorar largura dos inputs
						// Avaliar definição de endereço dinãmico via CEP (API)
					}

					{/* Conteudo do Formulário */}
					<div className="space-y-12">

						<div className="border-b border-gray-900/10 pb-7">
							<h2 className="text-base font-semibold leading-7 text-gray-900">Dados Cadastrais</h2>
							{/* <p className="mt-1 text-sm leading-6 text-gray-600">Preencha com um email que tenha acesso</p> */}

							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 ">

								{/* Div de Nome Completo */}
								<div className="sm:col-span-2">
									<label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nome Completo</label>
									<div className="mt-2">
										<input
											type="text"
											name="first-name"
											id="first-name"
											autoComplete="given-name"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
								{/* Div de input Email */}
								<div className="sm:col-span-2 sm:col-start-1">

									<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Endereço de Email</label>
									<div className="mt-2">
										<input
											id="email"
											name="email"
											type="email"
											autoComplete="email"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>

								</div>

								{/* Div de input CEP */}
								<div className="sm:col-span-1 sm:col-start-1">
									<label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">CEP</label>

									<div className="mt-2">
										<input
											type="number"
											// pattern="\d{5}-\d{3}"
											name="postal-code"
											id="postal-code"
											// autoComplete="postal-code"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								{/* Div de input Numero */}
								<div className="sm:col-span-1">
									<label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
										Numero
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="city"
											id="city"
											autoComplete="address-level2"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>

								</div>

							</div>
						</div>
					</div>

					{/* Rodapé para envio */}
					<div className="mt-2 flex items-center justify-end gap-x-6">
						<button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
						<button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
					</div>
				</form>
			</div>
		</div>

	)
}
