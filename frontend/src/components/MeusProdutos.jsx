import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchLogin, fetchProductsByUser, removeBike } from "./BackendUtils";

const MeusProdutos = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchBikes = async () => {
			setLoading(true);
			setError(null);

			// Logar como parracho
			const { userId: id } = await fetchLogin("parracho@gmail.com", "12345");

			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setError("Você precisa estar logado para ver suas bicicletas.");
					setLoading(false);
					return;
				}
				if (id != 0) {
					const my_annouces = await fetchProductsByUser(id, token);

					if (my_annouces !== null) {
						setProducts(my_annouces);
					}
				}
			} catch (err) {
				setError("Ocorreu um erro ao carregar minhas bicicletas.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchBikes();
	}, []);


	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			const remove_id = e.target.name;

			let has_deleted = await removeBike(remove_id);

			if (has_deleted) {
				console.log("Produto deletado com sucesso");
				// Atualiza a coleção/estado na pagina 
				setProducts(products.filter((produto) => produto.bikeId !== remove_id));
			} else {
				console.log("Ocorreu algum erro inesperado");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Minhas Bicicletas:</h2>

				{loading ? (
					<p className="text-lg text-gray-700 mt-4">Carregando...</p>
				) : error ? (
					<p className="text-lg text-red-700 mt-4">{error}</p>
				) : products.length === 0 ? (
					<p className="text-lg text-gray-700 mt-4">Você ainda não anunciou nenhuma bicicleta.</p>
				) : (
					<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
						{products.map((bike) => (
							<div key={bike.bikeId} className="relative bg-black border border-black">
								<Link to={`/bike/${bike.bikeId}`} className="relative bg-black border border-black">
									<img src={bike.imagem} alt={bike.title} className="object-cover w-full h-72" />
									<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
										<p className="text-lg font-medium">Preço: {`R$ ${bike.price.toFixed(2)}`}</p>
										<p className="text-sm mt-1 h-10 overflow-hidden text-ellipsis">{bike.description}</p>
									</div>
								</Link>
								<div className="p-4">
									<Link
										to={`/editarproduto/${bike.bikeId}`}
										className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
									>
										Editar
									</Link>
									<button
										onClick={handleDelete}
										name={bike.bikeId}
										className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
									>
										X
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MeusProdutos;
