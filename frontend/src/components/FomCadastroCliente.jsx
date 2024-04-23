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
import { Link } from 'react-router-dom';

import useUserStore from './UserUtils';

export default function FormCliente() {


	const handleSubmit = (e) => {
		e.preventDefault();



		
	};



	return (
		<div className='min-w-96'>
			<div className="border border-gray-300 rounded-lg p-4"> {/* Adiciona uma borda ao redor do formulário */}
				<br />

				<div id="clientForm" className="grid place-content-center">
					<form onSubmit={handleSubmit}>

						{/* Conteudo do Formulário */}
						<div className="border-b border-gray-900/10 pb-7">
							<h1 className="text-base font-semibold leading-7 text-gray-900">Dados Cadastrais</h1>
							<div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 ">

								{/* Div de Nome Completo */}
								<div className="sm:col-span-2 mt-2">
									<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nome Completo</label>
									<span className="text-gray-600 text-xs font-light">Nome por extenso, não abrevie sobrenomes.</span>
									<input type="text" name="name" id="name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
								</div>

								{/* Div de input Email */}
								<div className="mt-2 sm:col-start-1">
									<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Endereço de Email</label>
									<span className="text-gray-600 text-xs font-light">Este email será utilizado para login no sistema</span>
									<input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
								</div>

								

								{/* Div de input Telefone */}
								<div className="mt-2">
									<label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
									<input type="text" pattern='[0-9]{8}' name="postal-code" id="postal-code" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
								</div>
								{/* Div de input CEP */}
								<div className="mt-2">
									<label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">CEP</label>
									<input type="text" pattern='[0-9]{8}' name="postal-code" id="postal-code" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
								</div>

								{/* Div de input Senha */}
								<div className="mt-2">
									<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Senha de Login</label>
									<input type="text" name="password" id="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
								</div>
							</div>
						</div>

						{/* Rodapé para envio */}
						<div className="mt-2 flex items-center justify-end gap-x-6">
							<button type="button" className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> <Link to="/home"><span className="inline-block mr-2">Cancel</span></Link></button>
							<button type="submit" className="rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span className="inline-block mr-2">Save</span></button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

