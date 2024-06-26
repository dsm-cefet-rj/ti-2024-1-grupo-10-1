import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useUserStore from './UserUtils';
import { fetchAllProducts } from './BackendUtils';

// TODO: Prioridade 1: Exibir um elemento diferente para quando não houver bikes favoritadas ("Você não possui bikes favoritas por enquanto")

const MeusFav = () => {

	const [products, setProducts] = useState([]);

	const userFavIds = useUserStore((state) => state.user.profile.favs);
	const logged = useUserStore((state) => state.user.logged);

	// Utiliza o useEffect para executar uma única vez, no carregamento da pagina
	// Fetch ao carregar a pagina para obter todos os produtos, como parametro passamos a função que vai atualizar nosso useState (setProducts)
	useEffect(() => { fetchAllProducts(setProducts); }, []);

	// console.log("Fetch de produtos:", products);
	// console.log("Ids Favoritados:", userFavIds);

	// Com os ids das bikes favoritadas e a relação de bikes gerar os links/componentes de acordo com os objetos favoritos do usuário
	const userFavoriteBikes = products.filter((product) => { return userFavIds.includes(product.id_bike) });

	console.log("Produtos Favoritados:", userFavoriteBikes);

	return (
		// Se n estiver logado, não mostre nada
		logged &&
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Bikes Favoritas:</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{/* // Mapeie as bicicletas favoritadas pelo cliente */}
					{userFavoriteBikes.map((bike) => (
						<Link to={`/bike/${bike.id_bike}`} key={bike.id_bike} className="group relative">
							{/* Adicione o Link e especifique um link em BikeSelecionada.jsx */}
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img src={bike.imagem} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<a href={bike.href}>
											<span aria-hidden="true" className="absolute inset-0" /> {bike.titulo}</a>
									</h3>
									<p className="mt-1 text-sm text-gray-500">{bike.tipo}</p>
								</div>
								<p className="text-sm font-medium text-gray-900">R$ {bike.valor}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default MeusFav;
