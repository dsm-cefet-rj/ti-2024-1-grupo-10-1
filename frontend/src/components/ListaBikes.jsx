import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useUserStore from './UserUtils';
import {fetchAllProducts} from './BackendUtils';
import useBikeStore from '../store.js'

const ListaBikes = () => {
	const [bikes, setBikes] = useState([]);

	const selectedBikeType = useBikeStore((state) => state.selectedBikeType);

	const { has_logged } = useUserStore((state) => ({ has_logged: state.user.logged }));
	
	useEffect(() => {
		fetchAllProducts(setBikes);
	}, []);

	const filteredBikes = bikes.filter(
		(bike) => bike.tipo === selectedBikeType
	);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Resultados:</h2>

				{/* Condição para verificar se há bicicletas filtradas de determinado tipo*/}
				{filteredBikes.length === 0 ? (
					<p className="text-lg text-gray-700 mt-4">Nenhuma bicicleta encontrada para o tipo selecionado :(</p>
				) : (

				<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
					{filteredBikes.map((bike) => (
						<Link
							to={has_logged ? `/bike/${bike.bikeId}` : '/login'}
							key={bike.bikeId}
							className="relative bg-black border border-black">

							<img
								src={bike.imagem}
								alt={bike.titulo}
								className="object-cover w-full h-72"
							/>

							<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
								<p className="text-lg font-medium">Preço: {`R$ ${bike.price.toFixed(2)}`}</p>
								<p className="text-sm mt-1 h-10 overflow-hidden text-ellipsis">{bike.description}</p>
							</div>

						</Link>
					))}
				</div>
				)}
			</div>
		</div>
	);
};
export default ListaBikes; 