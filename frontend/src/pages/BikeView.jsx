import React from 'react'
import HeaderHome from '../components/HeaderHome'
import BikeSelecionada from '../components/BikeSelecionada'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const BikeView = () => {
  return (
    <div>
        <HeaderHome></HeaderHome>
        <BikeSelecionada></BikeSelecionada>
    </div>
  )
}

export default BikeView