import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useUserStore from './UserUtils';

const ListaBikes = () => {
	const [bikes, setBikes] = useState([]);
	const selectedBikeType = useUserStore((state) => state.selectedBikeType);
	const { has_logged } = useUserStore((state) => ({ has_logged: state.user.logged }));

	useEffect(() => {
		const fetchBikes = async () => {
			try {
				const response = await axios.get('http://localhost:12345/bike'); // Altere a URL conforme necessário
				setBikes(response.data);
			} catch (error) {
				console.error('Ocorreu um erro ao buscar as bicicletas:', error);
			}
		};

		fetchBikes();
	}, []);

	const filteredBikes = bikes.filter((bike) => bike.tipo === selectedBikeType);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Resultados:</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{filteredBikes.map((bike) => (
						<Link to={has_logged ? `/bike/${bike.id_bike}` : '/login'} key={bike.id_bike} className="group relative">
							<div className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img src={bike.imagem} alt={bike.Titulo} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={bike.href}>
												<span aria-hidden="true" className="absolute inset-0" /> {bike.Titulo}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">{bike.Descricao}</p>
									</div>
									<p className="text-sm font-medium text-gray-900">{`R$ ${bike.Valor.toFixed(2)}`}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};
export default ListaBikes; 