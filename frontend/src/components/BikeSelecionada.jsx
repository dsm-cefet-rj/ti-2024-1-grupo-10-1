import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams do react-router-dom
import { PatchFavorite, fetchProduct, fetchUserData } from "./BackendUtils";

import coracao from "../assets/Coraçao.png";

const BikeSelecionada = () => {
	// Id da bike selecionada
	const { id } = useParams();

	// Informações da bike a serem carregadas a partir do id
	const [bike, setBike] = useState({});

	// Informação do usuario em relação ao favoritismo da bike
	const [favorite, setFavorite] = useState(false);

	// Coleção de ids favoritados do usuário
	const [favColl, setFavColl] = useState([]);

	// Informação do vendedor da bike
	const [data_vend, setVend] = useState({});

	const token = localStorage.getItem("token");

	// var to_remove = false;

	const toggleFavBnt = (e) => {
		e.preventDefault();
		if (e.target != null) {
			const texto = document.getElementById("fav").children[1];
			if (texto.innerText == "Remover dos Favoritos") {
				// Vou remover
				setFavorite(false);
				texto.innerText = "Adicionar aos Favoritos";
			} else if (texto.innerText == "Adicionar aos Favoritos") {
				// Vou adicionar
				texto.innerText = "Remover dos Favoritos";
				setFavorite(true);
			}
		}
	};

	// Ao carregar a pagina, será carregado as informações da bike e do vendedor
	useEffect(() => {
		var is_logged = false;

		const getUser = async () => {
			try {
				// Coleta os dados do usuário
				const response = await fetchUserData(token);
				// {status: 200, data: {nome:nome, email:email, fav: ids_favoritados }}
				// {status: 401, data: null}
				if (response.status == 200) {
					is_logged = true;
					const user_fav_collection = response.data.favs;

					setFavColl(user_fav_collection);

					if (user_fav_collection.includes(id)) {
						// Pertence a coleção de favoritos
						document.getElementById("fav").children[1].innerText = "Remover dos Favoritos";
					} else {
						// Não pertence a coleção de favoritos
					}

					// Marcar para criar um botão
				} else if (response.status == 401) {
					// O usuário não tem um token válido...vamos remover então
					localStorage.removeItem("token");

					// Solicitar os dados da bike sem os dados do vendedor no fetchProduct
					is_logged = false;
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

		const load_bike_and_user = async () => {
			await getUser();
			await getBike();
		};
		load_bike_and_user();
	}, []);

	useEffect(() => {
		const toggleFavorite = async () => {
			// Toggle favorite into user's list
			if (favorite) {
				// Caso a intenção é adicionar na coleção de favoritos:
				setFavColl(...favColl, id);
			} else {
				// Caso a intenção é remover da coleção de favoritos:
				setFavColl(favColl.filter((id_fav) => id_fav !== id));
			}

			// Com isso, vamos atualizar o bd baseado no favColl
			var success = await PatchFavorite(token, id, favColl);
			if (success) {
				console.log("Bike", favorite ? "adicionada" : "removida" + " da lista de favoritos");
			}
		};
		toggleFavorite();
	}, [favorite]);

	// console.log("Dados da Bike:", bike);
	// console.log("Dados do vendedor:", data_vend);

	if (!bike) return <div> Carregando...</div>;

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
						<span>Adicionar dos Favoritos</span>
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
