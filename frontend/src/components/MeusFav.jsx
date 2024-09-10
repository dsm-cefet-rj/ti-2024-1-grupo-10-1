import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFavorites } from "./BackendUtils";

// TODO: Prioridade 1: Exibir um elemento diferente para quando não houver bikes favoritadas ("Você não possui bikes favoritas por enquanto")

const MeusFav = () => {
	const [favoritos, setFavoritos] = useState([]);

	// const userState = useUserStore();
	// console.log(userState.user);

	// Utiliza o useEffect para executar uma única vez, no carregamento da pagina
	/*useEffect(() => {
		const getFavs = async () => {
			// Login as parracho -> Será substituido pelo carregamento do estado do usuário
			// const { userId: id } = await fetchLogin("parracho@gmail.com", "12345");

			// if (userState.user.id !== 0) {
			// Collect favorites
			const token = localStorage.getItem("token");
			const data_favorites = await fetchFavorites(token);
			// Check response
			if (data_favorites != null) {
				// Set favorite data
				if (data_favorites.status == "OK") setFavoritos(data_favorites.favs);
			}
			// }
		};
		getFavs();
	}, []); */
	useEffect(() => {
		const getFavs = async () => {
			if (userState.user.id !== 0) {
				try {
					// Buscar favoritos do usuário
					const data_favorites = await fetchFavorites(userState.user.id);
					console.log("Dados retornados de fetchFavorites:", data_favorites);

					// Verifica se a resposta é válida
					if (data_favorites && data_favorites.status === "OK") {
						setFavoritos(data_favorites.favs);
					} else {
						console.error("Erro ao buscar favoritos ou nenhum favorito encontrado");
					}
				} catch (error) {
					console.error("Erro durante a busca dos favoritos:", error);
				}
			}
		};
		getFavs();
	}, [userState.user.id]);

	// const userFavIds = useUserStore((state) => state.user.profile.favs);
	// const logged = useUserStore((state) => state.user.logged);

	// // Fetch ao carregar a pagina para obter todos os produtos, como parametro passamos a função que vai atualizar nosso useState (setProducts)
	return (
		// Se n estiver logado, não mostre nada
		// logged &&
		favoritos.length != 0 ? (
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">Bikes Favoritas:</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{/* // Mapeie as bicicletas favoritadas pelo cliente */}
						{favoritos.map((bike) => (
							<Link to={`/bike/${bike._id}`} key={bike._id} className="group relative">
								{/* // Adicione o Link e especifique um link em BikeSelecionada.jsx */}
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={bike.imagem}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<p className="mt-1 text-sm text-gray-500">{bike.tipo}</p>
									</div>
									<p className="text-sm font-medium text-gray-900">R$ {bike.price}</p>
									{bike.titulo}
									{/* <h3 className="text-sm text-gray-700">
									<span aria-hidden="true" className="absolute inset-0"></span>
								</h3> */}
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		) : (
			<div>Você não possui itens favoritados.</div>
		)
	);
};

export default MeusFav;
