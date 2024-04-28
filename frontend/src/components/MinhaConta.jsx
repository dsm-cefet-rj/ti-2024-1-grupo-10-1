import React from 'react'
import { Link } from 'react-router-dom';

import useUserStore from './UserUtils';

const Minhaconta = () => {

	const { user, updateNome, updateEmail, updateCep, updateCheckIn } = useUserStore((state) => ({
		user: state.user,
		updateNome: state.updateNome,
		updateEmail: state.updateEmail,
		updateCep: state.updateCep,
		updateCheckIn: state.setLoggedAccount
	}))


	const checkoutLogin = () => {

		console.log(user);
		updateCheckIn(false);
		updateNome("");
		updateEmail("");
		updateCep("");
		console.log(user);
	}


	return (
		user.logged &&
		< div className="mx-auto right-0 mt-12 w-60" >
			<div className="bg-white rounded overflow-hidden shadow-lg">
				<div className="text-center p-6 bg-purple-600 border-b">
					<svg aria-hidden="true" role="img" className="h-40 w-40 text-white rounded-full mx-auto" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M172 120a44 44 0 1 1-44-44a44 44 0 0 1 44 44Zm60 8A104 104 0 1 1 128 24a104.2 104.2 0 0 1 104 104Zm-16 0a88 88 0 1 0-153.8 58.4a81.3 81.3 0 0 1 24.5-23a59.7 59.7 0 0 0 82.6 0a81.3 81.3 0 0 1 24.5 23A87.6 87.6 0 0 0 216 128Z"></path></svg>

					<p className="pt-2 text-lg font-semibold text-gray-50">{user.profile.nome || ""}</p>
					<p className="text-sm text-gray-100">{user.profile.email || ""}</p>
					<Link to="/editarcadastro" className="px-4 py-2 hover:bg-gra-100 flex">
						<div className="mt-5">
							<a className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">Alterar Informações</a>
						</div>
					</Link>
				</div>
				{/* Div de Favoritos */}
				<div className="border-b">

					<Link to="/favoritos" className="px-4 py-2 hover:bg-gray-100 flex">
						<div className="text-purple-600">
							<svg className="w-5 h-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24">
								<path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
							</svg>
						</div>

						<div className="pl-3">
							<p className="text-sm font-medium text-gray-800 leading-none"> Favoritos </p>
							<p className="text-xs text-gray-500">Veja seus favoritos</p>
						</div>
					</Link>

					<a className="px-4 py-2 hover:bg-gray-100 flex">
						<div className="text-gray-800">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24">
								<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
						</div>

						<div className="pl-3">
							<p className="text-sm font-medium text-gray-800 leading-none">Meus anúncios</p>
							<p className="text-xs text-gray-500">Veja seus anúncios</p>
						</div>
					</a>
				</div>

				<div className="">
					<Link className="w-full px-4 py-2 pb-4 hover:bg-gray-100 flex" onClick={checkoutLogin} to="/home">
						<p className="text-sm font-medium text-gray-800 leading-none">Sair</p>
					</Link>
				</div>
			</div>
		</div >
	)
}

export default Minhaconta
