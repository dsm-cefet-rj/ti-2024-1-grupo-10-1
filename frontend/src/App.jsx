import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './pages/Home';
import Bike from './pages/Bike';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import CadastroCliente from './pages/CadastroCliente';
import Favoritos from './pages/Favoritos';
import Anuncios from './pages/Anuncios';
import Conta from './pages/Conta'
import BikeView from './pages/BikeView';
import FeedbackPost from './pages/FeedbackPost';

import defaultUserStore from './components/UserUtils';


const App = () => {

	const { user, setName, setCep, setEmail, setPass } = defaultUserStore();

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/feedback" element={<Feedback />} />
				<Route path="/cadastro-cliente" element={<CadastroCliente />} />
				<Route path="/bike" element={<Bike />} />
				<Route path="/home" element={<Home />} />
				<Route path="/anuncios" element={<Anuncios />} />
				<Route path="/conta" element={<Conta />} />
				<Route path="/favoritos" element={<Favoritos />} />
				<Route path="/bike/:id" element={<BikeView />} />
				<Route path="/feedbackpost" element={<FeedbackPost />} />
				<Route path='*' element={<Navigate to={"/"} />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
