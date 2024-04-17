import React from 'react';
import Speed from '../assets/speed3.jpg';
import passeio from '../assets/passeio.jpg';
import MTB from '../assets/MTB.jpg';
import Eletrica from '../assets/BikeEletrica.jpg'
import { Link } from 'react-router-dom';


const products = [
  {
    id: 1,
	name: 'Bike Mtb Shimano Deore 29 1x 12v 11x52 S.Trava Tucana',
    href: '#',
    imageSrc: MTB,
    imageAlt: 'Bike MTB.',
    price: '$4.000',
    color: 'Red',
    type: "MTB"
  },
  {
    id: 2,
	name: 'Bicicleta de Passeio Comfort Plus',
    href: '#',
    imageSrc: passeio,
    imageAlt: 'Bike Passeio',
    price: '$1.800',
    color: 'White',
	type: "Passeio"
  },
  {
    id: 3,
	name: 'Bicicleta Elétrica Lev - Novas e Usadas com garantia.',
    href: '#',
    imageSrc: Eletrica,
    imageAlt: 'Eletric Bike',
    price: '$4.00',
    color: 'Black',
	type: "Eletrica"
  },
  {
    id: 4,
    name: 'Bicicleta Rav2r Speed Carbono Aro 700 Kit.',
    href: '#',
    imageSrc: Speed,
    imageAlt: 'Bike Speed',
    price: '$20.00',
    color: 'Orange',
	type: "Speed"
  }
  // Mais produtos...
];

const ListaBikes = ({ selectedBikeType }) => {
	const filteredProducts = products.filter(product => product.type === selectedBikeType);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Resultados:</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{filteredProducts.map((product) => (
						<Link to={`/bike/${product.id}`} key={product.id} className="group relative">
							<div className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={product.imageSrc}
										alt={product.imageAlt}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={product.href}>
												<span aria-hidden="true" className="absolute inset-0" />
												{product.name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">{product.color}</p>
									</div>
									<p className="text-sm font-medium text-gray-900">{product.price}</p>
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