import React from 'react'

const BarraLogin = () => {
	return (
		<div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 border border-gray-300">
			<div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-white border border-gray-300 rounded-lg">
				<h1 class="text-center text-2xl mb-5">Acesse sua conta</h1>
				<div class="bg-white shadow w-full rounded-lg divide-y divide-gray-300 border boder-gray-300">
					<div class="px-9 py-12">
						<label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
						<input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
						<label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
						<input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
						<button type="button" class="transition duration-200 bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
							<span class="inline-block mr-2">Login</span>
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</button>
					</div>

					<div class="text-center">
						<button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
							<span class="inline-block ml-1">Não tem uma conta? Cadastre-se</span>
						</button>
					</div>
				</div>
				<div class="py-5">
					<div class="grid grid-cols-2 gap-1">
						<div class="text-center sm:text-left whitespace-nowrap">
							<button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
								</svg>
								<span class="inline-block ml-1">Voltar pra Home</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BarraLogin