import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams do react-router-dom
import { fetchProduct, fetchUser } from "./BackendUtils";
import useUserStore from "./UserUtils";
import coracao from '../assets/Coraçao.png'

const BikeSelecionada = () => {
	const { id } = useParams();

	const [bike, setBike] = useState({});
	const [vendedor, setVendedor] = useState({});
	const [is_favorite, setFavorite] = useState(false);

	useEffect(() => {
		fetchProduct(setBike, id);
		fetchUser(setVendedor, bike.userId);
	}, []);

	const { userFavs } = useUserStore((state) => ({ userFavs: state.user.profile.favs }));

	useEffect(() => {
		setFavorite(userFavs.includes(id));
	}, [userFavs]);




	if (!bike) return <div> Carregando...</div>;

	// console.log(bike);
	// console.log(assoc_user);
	console.log("Favoritos do Usuario:", userFavs);
	console.log("BikeId:", id);
	console.log("Está contido:", userFavs.includes(id));

	return (
		<div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
			<div className="flex justify-center items-center lg:flex-row flex-col gap-8">

				<div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
					<p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">Home / Bike / {bike.titulo}</p>
					<h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{bike.titulo}</h2>
					<div className=" flex flex-row justify-between  mt-5">
						<p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">{bike.favCounter} pessoas favoritaram</p>
					</div>
					<p className=" font-normal text-base leading-6 text-gray-600 mt-7">{bike.descricao}</p>
					<p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">R$ {bike.valor}</p>
					<div className="lg:mt-11 mt-10">
						<div className="flex flex-row justify-between">
							<p className=" font-medium text-base leading-4 text-gray-600"><b>Localização/Contato:</b></p>
						</div>
						<hr className=" bg-gray-200 w-full my-2" />
						{/* <div className=" flex flex-row justify-between items-center mt-6">
							<p className="font-medium text-base leading-4 text-gray-600"><b>Descrição:</b></p>
							{bike.descricao}
						</div>
						<hr className=" bg-gray-200 w-full mt-4" /> */}
					</div>
					<button className="focus:outline-none focus:ring-2 hover:bg-purple-500 focus:ring-offset-2 focus:ring-purple-700 font-medium text-base leading-4 text-white bg-purple-600 w-full py-5 lg:mt-12 mt-6 flex items-center justify-center" >
						{is_favorite ? "Adicionar aos favoritos" : "Remover dos favoritos"} <img src={coracao} className="w-6 h-6 ml-4" alt="Coração" />
					</button>
				</div>
				{/* <!-- Preview Images Div For larger Screen--> */}
				<div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
					<div className=" w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
						<img src={bike.imagem} alt={bike.titulo} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BikeSelecionada;