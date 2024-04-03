import React from 'react'
import Header from '../components/Header'
import Options from '../components/Options'
import CiclistaMeio from '../components/CiclistaMeio'
import End from '../components/End'
import HeaderVenda from '../components/HeaderVenda'
import MeioVendas from '../components/MeioVendas'
import PreencherVenda from '../components/PreencherVenda'

/*
1     <Header></Header>
      <Options></Options>
      <CiclistaMeio></CiclistaMeio>
      <End></End>

2     <HeaderVenda></HeaderVenda>
      <MeioVendas></MeioVendas>
      <PreencherVenda></PreencherVenda>
*/

function Home() {
  return (
    <div>
      <Header></Header>
      <Options></Options>
      <CiclistaMeio></CiclistaMeio>
      <End></End>
    </div>
  )
}

export default Home