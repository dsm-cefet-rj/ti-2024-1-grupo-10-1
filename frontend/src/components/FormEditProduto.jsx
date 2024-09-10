import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct, patchBike } from "./BackendUtils";

const FormEditProduto = () => {
	const { id: bikeId } = useParams(); // Pega o bikeId da URL
	const [bike, setBike] = useState({});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState("");

	const navigate = useNavigate();

	// Busca as informações da bike com base no ID
	useEffect(() => {
		const LoadProductData = async () => {
			try {
				setLoading(true);
				// Chama uma função do backendUtils
				if (bikeId !== null) {
					var bike_data = await fetchProduct(bikeId);
					setBike(bike_data);
				}
				// const response = await axios.get(`http://localhost:3015/bike/${bikeId}`);
				// var response = null;
				// Preenche o formulário com os dados da bike
				// if (response !== null) setBike(response.data);
			} catch (err) {
				setError("Erro ao carregar os dados da bicicleta.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		LoadProductData();
		console.log(bike);
	}, []);

	// Função para atualizar os valores do estado
	const handleChange = (e) => {
		const { name, value } = e.target;
		setBike((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Função para enviar os dados atualizados para o backend
	const handleSubmit = async (e) => {
		e.preventDefault();
		// Avaliar se todos os campos estão preenchidos corretamente
		try {
			var response = await patchBike(bikeId, bike);
			if (response !== null) {
				setMessage("Anúncio atualizado com sucesso!");
				console.log("Produto atualizado com sucesso");
				navigate("/minhasbikes"); // Redireciona para a lista de bikes
			}
		} catch (error) {
			console.error(error);
			console.error("Erro ao atualizar produto:", error.response ? error.response.data : error.message);
			setError("Erro ao atualizar o anúncio.");
		}
	};

	return (
		<div className="bg-white p-8">
			<h2 className="text-2xl font-bold mb-6">Editar Anúncio</h2>

			{loading ? (
				<p>Carregando...</p>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Título:</label>
						<input
							type="text"
							name="title"
							value={bike.title}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Descrição:</label>
						<textarea
							name="description"
							value={bike.description}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">Preço (R$):</label>
						<input
							type="number"
							name="price"
							value={bike.price}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700">URL da Imagem:</label>
						<input
							type="text"
							name="imagem"
							value={bike.imagem}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded"
						/>
					</div>

					<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
						Atualizar Anúncio
					</button>
					{message && <p className="mt-4 text-green-500">{message}</p>}
				</form>
			)}
		</div>
	);
};

export default FormEditProduto;
