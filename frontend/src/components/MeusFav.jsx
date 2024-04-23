import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import useBikeStore from '../store';
import useUserStore from './UserUtils';
import axios, { AxiosError } from 'axios';





const MeusFav = () => {


	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		try {
			const response = await axios.get('http://localhost:12345/product');

			if (response.status == 200) setProducts(response.data);

			else throw AxiosError.ERR_BAD_RESPONSE;
		} catch (error) {
			console.error('Ocorreu um erro ao buscar os dados:', error);
		}
	}

	const favoriteBikes = useBikeStore((state) => state.favoriteBikes); // Obtenha as bicicletas favoritadas do store

	// const userFavsIds = useUserStore((state) => state.user.profile.favs);

	// Com os ids das bikes favoritadas, extrair do server a relação de bikes e gerar os links/componentes de acordo
	// TODO: Parametrizar os endpoints em um unico arquivo e importá-los quando necessário 


	fetchProducts();
	console.log(products);

	// console.log(userState);
	// console.log(objs_favoritados);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Bikes Favoritas:</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{/* // Mapeie as bicicletas favoritadas pelo cliente */}
					{favoriteBikes.map((bike) => (
						<Link to={`/bike/${bike.id}`} key={bike.id} className="group relative">
							{/* Adicione o Link e especifique um link em BikeSelecionada.jsx */}
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img src={bike.imageSrc} alt={bike.imageAlt} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<a href={bike.href}>
											<span aria-hidden="true" className="absolute inset-0" /> {bike.name}</a>
									</h3>
									<p className="mt-1 text-sm text-gray-500">{bike.color}</p>
								</div>
								<p className="text-sm font-medium text-gray-900">{bike.price}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default MeusFav;
