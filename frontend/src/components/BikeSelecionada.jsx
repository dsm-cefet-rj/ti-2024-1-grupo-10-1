import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams do react-router-dom
import useBikeStore from "../store";
import coracao from '../assets/Coraçao.png'
import Speed from '../assets/speed3.jpg';
import passeio from '../assets/passeio.jpg';
import MTB from '../assets/MTB.jpg';
import Eletrica from '../assets/BikeEletrica.jpg'

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

const BikeSelecionada = () => {
	const { id } = useParams();
	const [bike, setBike] = useState(null);
	const favoriteBikes = useBikeStore((state) => state.favoriteBikes); // Acesse a lista de bicicletas favoritas do store
	const addFavoriteBike = useBikeStore((state) => state.addFavoriteBike); // Função para adicionar bicicletas aos favoritos
	const removeFavoriteBike = useBikeStore((state) => state.removeFavoriteBike); // Função para remover bicicletas dos favoritos

	useEffect(() => {
		const selectedBike = products.find((product) => product.id === parseInt(id));//encontrando a bike pelo id
		setBike(selectedBike);
	}, [id]);

	if (!bike) return <div>Carregando...</div>;

	const isFavorite = favoriteBikes.some((favBike) => favBike.id === bike.id);

	const handleFavoriteToggle = () => {
		if (isFavorite) {
			removeFavoriteBike(bike.id);
		} else {
			addFavoriteBike(bike);
		}
	};

	return (
		<div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
			<div className="flex justify-center items-center lg:flex-row flex-col gap-8">
				{/* <!-- Description Div --> */}
				<div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
					<p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">Home / Bike / </p>
					<h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{bike.name}</h2>
					<div className=" flex flex-row justify-between  mt-5">
						<p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">{favoriteBikes.length} favoritaram</p>
					</div>
					<p className=" font-normal text-base leading-6 text-gray-600 mt-7">{bike.description}</p>
					<p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">{bike.price}</p>
					<div className="lg:mt-11 mt-10">
						<div className="flex flex-row justify-between">
							<p className=" font-medium text-base leading-4 text-gray-600"><b>Localização/Contato:</b></p>
							{bike.location}
						</div>
						<hr className=" bg-gray-200 w-full my-2" />
						<div className=" flex flex-row justify-between items-center mt-6">
							<p className="font-medium text-base leading-4 text-gray-600"><b>Condição:</b></p>
							{bike.condition}
						</div>
						<hr className=" bg-gray-200 w-full mt-4" />
					</div>
					<button className="focus:outline-none focus:ring-2 hover:bg-purple-500 focus:ring-offset-2 focus:ring-purple-700 font-medium text-base leading-4 text-white bg-purple-600 w-full py-5 lg:mt-12 mt-6 flex items-center justify-center" onClick={handleFavoriteToggle}>
						{isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"} <img src={coracao} className="w-6 h-6 ml-4" alt="Coração" />
					</button>
				</div>
				{/* <!-- Preview Images Div For larger Screen--> */}
				<div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
					<div className=" w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
						<img src={bike.imageSrc} alt={bike.name} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BikeSelecionada;