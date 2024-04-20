import React from 'react'
import HeaderHome from '../components/HeaderHome'
import Options from '../components/Options'
import CiclistaHome from '../components/CiclistaHome'
import Recomendados from '../components/Recomendados'
import HeaderVenda from '../components/HeaderVenda'
import MeioVendas from '../components/MeioVendas'
import PreencherVenda from '../components/PreencherVenda'
import HeaderLogin from '../components/HeaderLogin'

import useUserStore from '../components/UserUtils';

function Home() {

	const { user } = useUserStore();

	// setNomeCompleto("Rodrigo");
	return (
		<div>
			{/* <h1>{user.nomeCompleto}</h1> */}
			<HeaderHome></HeaderHome>
			<Options></Options>
			<CiclistaHome></CiclistaHome>
			<Recomendados></Recomendados>
		</div>
	)
}

export default Home