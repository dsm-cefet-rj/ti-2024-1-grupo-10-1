import React from 'react';
import { Link } from 'react-router-dom';
import passeio from '../assets/passeio.jpg';
import MTB from '../assets/MTB.jpg';
import Eletrica from '../assets/BikeEletrica.jpg'
import Speed from '../assets/speed3.jpg';


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
		price: '$4.000',
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


const Recomendados = () => {
	// TODO Trocar a div por uma ul e ir adicionando os elementos, atentar para as margens laterais...
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 mt-10 mx-5">
			<Link to="/login" className="relative bg-black">
				<img src={Speed} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $10000</p>
					<p className="text-sm">Bicicleta Rav2r Speed Carbono Aro 700 Kit.</p>
				</div>
			</Link>

			<Link to="/bike/2" className="relative bg-black">
				<img src={passeio} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $1800</p>
					<p className="text-sm">Bicicleta de Passeio Comfort Plus</p>
				</div>
			</Link>

			<Link to="/bike/1" className="relative bg-black">
				<img src={MTB} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $4.000</p>
					<p className="text-sm">Bike Mtb Shimano Deore 29 1x 12v 11x52 S.Trava Tucana.</p>
				</div>
			</Link>

			<Link to="/bike/3" className="relative bg-black">
				<img src={Eletrica} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $4.000</p>
					<p className="text-sm">Bicicleta Elétrica Lev - Novas e Usadas com garantia.</p>
				</div>
			</Link>
		</div>
	);
};

export default Recomendados;
