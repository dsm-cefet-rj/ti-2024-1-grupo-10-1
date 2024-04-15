import React from 'react'
import HeaderHome from '../components/HeaderHome'
import HeaderVenda from '../components/HeaderVenda'
import MeioVendas from '../components/MeioVendas'
import PreencherVenda from '../components/PreencherVenda'

//só tem "anunciar bike" ate agr
const Anuncios = () => {
  return (
    <div>
      <HeaderVenda ></HeaderVenda >
	  <MeioVendas></MeioVendas>
	  <PreencherVenda></PreencherVenda> 
    </div >
  )
}

export default Anuncios