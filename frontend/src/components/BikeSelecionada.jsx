import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams do react-router-dom
import { PatchFavorite, fetchProduct, fetchUserData } from "./BackendUtils";

import coracao from "../assets/Coraçao.png";

const BikeSelecionada = () => {
	// Id da bike selecionada
	const { id } = useParams();

	// Coleção de ids favoritados do usuário
	const [favColl, setFavColl] = useState({ able: false, favs: [] });

	// Informações da bike a serem carregadas a partir do id
	const [bike, setBike] = useState({});

	// Informação do vendedor da bike
	const [data_vend, setVend] = useState({});

	// Informação de favoritagem
	const [num_fav, setNumFav] = useState(0);

	const token = localStorage.getItem("token");

	const navigate = useNavigate();

	// Ao carregar a pagina, será carregado as informações da bike e do vendedor
	useEffect(() => {
		var is_logged = false;

		const load_bike_and_user = async () => {
			try {
				// getUser

				// Coleta os dados do usuário
				const response = await fetchUserData(token);
				// {status: 200, data: {nome:nome, email:email, fav: ids_favoritados }}
				// {status: 401, data: null}

				if (response.status == 200) {
					is_logged = true;
					var idsFavoritados = response.data.FavIds;

					if (idsFavoritados.includes(id)) {
						// Pertence a coleção de favoritos
						document.getElementById("fav").children[1].innerText = "Remover dos Favoritos";
					}
					setFavColl({ able: true, favs: idsFavoritados });
					// else {
					// 	// Não pertence a coleção de favoritos
					// }
				} else if (response.status == 401) {
					// O usuário não tem um token válido...vamos remover então
					localStorage.removeItem("token");

					// Solicitar os dados da bike sem os dados do vendedor no fetchProduct
					is_logged = false;
				}

				// getBike
				const { sellerData: vendedor, favCounter: num_favoritado, ...bike_data } = await fetchProduct(id, is_logged);
				if (is_logged) setVend(vendedor);
				// Update num_fav
				setNumFav(num_favoritado);
				// Load bike data into render
				setBike(bike_data);
			} catch (error) {
				console.error("Capturei um erro diferente:" + error.message);
			}
		};

		load_bike_and_user();
	}, [id, token]);

	// Quando a coleção de favoritos for alterada, envie uma requisição de atualização
	useEffect(() => {
		const sendNewFavorites = async (token, newFavs) => {
			const { able: can_request, favs: colecao } = newFavs;
			if (can_request) {
				const response = await PatchFavorite(token, colecao);

				if (response.status == 200) {
					console.log(favColl.favs);
				}
			}
		};
		sendNewFavorites(token, favColl);
	}, [favColl, token]);

	const toggleFavBnt = (e) => {
		e.preventDefault();

		// Toggle favorite into user's list
		if (e.target != null) {
			// Se o palhaço quer favoritar sem estar logado, redirecione para o login.
			if (token === null) navigate("/login");

			const toggleBnt = document.getElementById("fav").children[1];

			if (toggleBnt.innerText == "Remover dos Favoritos") {
				// Caso a intenção é remover da coleção de favoritos:

				// setFavColl((prevFavColl) => prevFavColl.filter((id_fav) => id_fav !== id));

				setNumFav((prevNum) => prevNum - 1);
				setFavColl((prevFavColl) => ({
					...prevFavColl,
					favs: prevFavColl.favs.filter((id_fav) => id_fav !== id),
				}));

				toggleBnt.innerText = "Adicionar aos Favoritos";
			} else if (toggleBnt.innerText == "Adicionar aos Favoritos") {
				// Caso a intenção é adicionar na coleção de favoritos:

				// setFavColl([...favColl, id]);

				setNumFav((prevNum) => prevNum + 1);
				setFavColl((prevFavColl) => ({
					...prevFavColl,
					favs: [...prevFavColl.favs, id],
				}));

				// Vou adicionar
				toggleBnt.innerText = "Remover dos Favoritos";
			}
		}
	};

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
							{num_fav} pessoas favoritaram
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
						<img src={coracao} className="w-6 h-6 ml-4" alt="Coração" />
						<span>Adicionar aos Favoritos</span>
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
