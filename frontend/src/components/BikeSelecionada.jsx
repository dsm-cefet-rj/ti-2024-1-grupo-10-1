import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams do react-router-dom
import { AddRemoveFavorite, fetchProduct, fetchUserData } from "./BackendUtils";

import coracao from "../assets/Coraçao.png";

const BikeSelecionada = () => {
	// Id da bike selecionada
	const { id } = useParams();

	const token = localStorage.getItem("token");

	// Informações da bike a serem carregadas a partir do id
	const [bike, setBike] = useState({});

	// Informação do usuario em relação ao favoritismo da bike
	const [favorite, setFavorite] = useState(false);

	const [data_vend, setVend] = useState({});

	// Ao carregar a pagina, será carregado as informações da bike e do vendedor
	useEffect(() => {
		var is_logged = false;

		const getUser = async () => {
			try {
				// Coleta os dados do usuário
				const response = await fetchUserData(token);
				// const {status: 200, data: {nome:nome, email:email, fav: ids_favoritados }}
				// {status: 401, data: null}
				if (response.status == 401) {
					// O usuário não tem um token válido...vamos remover então
					localStorage.removeItem("token");

					// Solicitar os dados da bike sem os dados do vendedor no fetchProduct
					is_logged = false;

					// Marcar para criar um botão
				} else if (response.status == 200) {
					is_logged = true;
					const user_fav_collection = response.data.favs;
					if (user_fav_collection.includes(id)) {
						setFavorite(true);
					} else {
						setFavorite(false);
					}
				}
			} catch (error) {
				console.error("Capturei um erro diferente:" + error.message);
			}
		};

		const getBike = async () => {
			const { sellerData: vendedor, ...bike_data } = await fetchProduct(id, is_logged);

			if (is_logged) setVend(vendedor);

			setBike(bike_data);
		};

		const teste = async () => {
			await getUser();
			await getBike();
		};
		teste();
		// fetchUser(setVendedor, bike.userId);
	}, []);
	
	console.log("Dados da Bike:", bike);
	console.log("Dados do vendedor:", data_vend);
	// useEffect(() => {
	// 	const toggleFavorite = async () => {
	// 		// Toggle favorite into user's list
	// 		var success = await AddRemoveFavorite(token, id);
	// 		if (success) {
	// 			console.log("Bike " + favorite ? "adicionada" : "removida" + " da lista de favoritos");
	// 		}
	// 	};
	// 	toggleFavorite();
	// 	// fetchUser(setVendedor, bike.userId);
	// }, [favorite]);

	// Quando userFavs alterar o valor, atualizaremos a variavel que indicara se a bike é favorita --- Serve para renderizar o texto do botão de favorito
	// useEffect(() => {
	// 	setFavorite(userFavs.includes(id));
	// }, [userFavs]);

	const toggleFavBnt = (e) => {
		e.preventDefault();
		if (e.target.text == "Remover dos favoritos") {
			setFavorite(false);
			e.target.text = "Adicionar aos Favoritos";
		} else {
			e.target.text = "Remover dos Favoritos";
			setFavorite(false);
		}
	};

	if (!bike) return <div> Carregando...</div>;

	// DEBUG --- Erro não consigo verificar a presença ou não da bike nos favoritos.
	// console.log(assoc_user);
	// console.log("Favoritos do Usuario:", userFavs);
	// console.log("BikeId:", id);
	// console.log("Está contido:", userFavs.includes(id));

	return (
		<div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
			<div className="flex justify-center items-center lg:flex-row flex-col gap-8">
				<div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
					<p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
						Home / Bike / {bike.title != null ? bike.title.replace(/ /g, "_") : ""}
					</p>
					<h4 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{bike.title}</h4>
					<div className=" flex flex-row justify-between  mt-5">
						<span className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
							<img src={coracao} className="w-6 h-6 inline-block mr-1" alt="Coração" />
							{bike.favCounter} pessoas favoritaram
						</span>
					</div>
					<p className=" font-normal text-base leading-6 text-gray-600 mt-7">{bike.description}</p>
					<p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">R$ {bike.price}</p>
					<div className="lg:mt-11 mt-10">
						<div className="flex flex-row justify-between">
							<p className=" font-medium text-base leading-4 text-gray-600">
								<b>Dados do Vendedor:</b>
								<br></br>
							</p>
						</div>
						<hr className=" bg-gray-200 w-full my-2" />
						<strong>Nome Completo: </strong>
						{data_vend.nome != null ? data_vend.nome : "Faça login para ter acesso aos dados do vendedor"}
						<br />
						<strong>Email: </strong>{" "}
						{data_vend.email != null ? data_vend.email : "Faça login para ter acesso aos dados do vendedor"}
						<br />
						<strong>Contato: </strong>
						{data_vend.email != null ? data_vend.telefone : "Faça login para ter acesso aos dados do vendedor"}
						<hr className=" bg-gray-200 w-full mt-4" />
					</div>

					{/* {Funcionalidade de checagem de produto marcado como favorito do usuário pendente} */}

					<button
						id="fav"
						onClick={toggleFavBnt}
						className="focus:outline-none focus:ring-2 hover:bg-purple-500 focus:ring-offset-2 focus:ring-purple-700 font-medium text-base leading-4 text-white bg-purple-600 w-full py-5 lg:mt-12 mt-6 flex items-center justify-center"
					>
						{/* {favorite ? "Adicionar aos favoritos" : "Remover dos favoritos"} */}
						<img src={coracao} className="w-6 h-6 ml-4" alt="Coração" />
					</button>
				</div>
				{/* <!-- Preview Images Div For larger Screen--> */}
				<div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
					<div className=" w-full lg:w-8/12 bg-gray-100 flex justify-center items-center">
						<img src={bike.imagem} alt={bike.title} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default BikeSelecionada;
