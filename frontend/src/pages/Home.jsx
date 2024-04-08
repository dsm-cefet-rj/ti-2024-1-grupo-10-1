import React from 'react'
import HeaderHome from '../components/HeaderHome'
import Options from '../components/Options'
import CiclistaHome from '../components/CiclistaHome'
import Recomendados from '../components/Recomendados'
import HeaderVenda from '../components/HeaderVenda'
import MeioVendas from '../components/MeioVendas'
import PreencherVenda from '../components/PreencherVenda'
import HeaderLogin from '../components/HeaderLogin'

/*
1     <HeaderHome></HeaderHome>
	  <Options></Options>
	  <CiclistaHome></CiclistaHome>
	  <Recomendados></Recomendados>

2     <HeaderVenda></HeaderVenda>
	  <MeioVendas></MeioVendas>
	  <PreencherVenda></PreencherVenda>
*/

function Home() {
	return (
		<div>
			<HeaderVenda></HeaderVenda>
			<MeioVendas></MeioVendas>
			<PreencherVenda></PreencherVenda>
		</div>
	)
}

export default Home