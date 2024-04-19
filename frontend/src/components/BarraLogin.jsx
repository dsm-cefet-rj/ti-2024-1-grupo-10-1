import React from 'react'

const BarraLogin = () => {
	return (
		<div className="min-h-screen min-w-fit bg-gray-100 flex flex-col justify-center sm:py-12 border border-gray-300">
			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-white border border-gray-300 rounded-lg">
				<h1 className="text-center text-2xl mb-5">Acesse sua conta</h1>
				<div className="bg-white shadow w-full rounded-lg divide-y divide-gray-300 border boder-gray-300">
					<div className="px-7 pb-7 pt-5">
						<label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label> <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
						<label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label> <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
						<button type="button" className="transition duration-200 bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
							<span className="inline-block mr-2">Login</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</button>
					</div>

					<div className="text-center">
						<button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
							<span className="inline-block ml-1">Não tem uma conta? Cadastre-se</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BarraLogin