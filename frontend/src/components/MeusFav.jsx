import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do react-router-dom
import useBikeStore from '../store';
import useUserStore from './UserUtils';

const MeusFav = () => {
	const favoriteBikes = useBikeStore((state) => state.favoriteBikes); // Obtenha as bicicletas favoritadas do store


	const userState = useUserStore((state) => state.user);

	console.log(userState);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Bikes Favoritas:</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{favoriteBikes.map((bike) => ( // Mapeie as bicicletas favoritadas pelo cliente
						<Link to={`/bike/${bike.id}`} key={bike.id} className="group relative"> {/* Adicione o Link e especifique o caminho para BikeSelecionada.jsx */}
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img src={bike.imageSrc} alt={bike.imageAlt} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<a href={bike.href}>
											<span aria-hidden="true" className="absolute inset-0" />
											{bike.name}
										</a>
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
