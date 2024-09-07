import React, { useState } from 'react';
import { postBike } from './BackendUtils'; // Função para fazer o POST para o backend

const PreencherVenda = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [tipo, setTipo] = useState('');
	const [imagem, setImagem] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Validação dos dados
		if (!title || !description || !price || !tipo || !imagem) {
			alert('Todos os campos são obrigatórios.');
			return;
		}

		// Criar o objeto bike
		const bikeData = {
			title,
			description,
			price,
			tipo,
			imagem
		};

		try {
			// Fazer a requisição POST para o backend
			const response = await postBike(bikeData);
			alert('Bike cadastrada com sucesso!');
		} catch (error) {
			alert('Erro ao cadastrar bike: ' + error.message);
		}
	};

	return (
		<div>
			<form className="mt-10 max-w-lg mx-auto" onSubmit={handleSubmit}>
				<div className="mb-5">
					<label className="block mb-2 text-sm font-medium text-gray-900">Título<span className='text-red-500 inline-block'>*</span></label>
					<input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />

					<label className="mt-5 block mb-2 text-sm font-medium text-gray-900">Descrição <span className='text-red-500 inline-block'>*</span></label>
					<input value={description} onChange={(e) => setDescription(e.target.value)} className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Descrição da bicicleta" required />

					<label className="mt-7 block mb-2 text-sm font-medium text-gray-900">Valor(R$)<span className='text-red-500 inline-block'>*</span></label>
					<input value={price} onChange={(e) => setPrice(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />

					<label className="mt-7 block mb-2 text-sm font-medium text-gray-900">Tipo <span className='text-red-500 inline-block'>*</span></label>
					<select value={tipo} onChange={(e) => setTipo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
						<option value="">Selecione um tipo</option>
						<option value="MTB">MTB</option>
						<option value="Passeio">Passeio</option>
						<option value="Speed">Speed</option>
						<option value="Eletrica">Elétrica</option>
						<option value="Other">Outro</option>
					</select>

					<label className="mt-7 block mb-2 text-sm font-medium text-gray-900">Imagem URL <span className='text-red-500 inline-block'>*</span></label>
					<input value={imagem} onChange={(e) => setImagem(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="URL da imagem" required />
				</div>

				<button type="submit" className="mb-10 mt-7 text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Anunciar Bike</button>
			</form>
		</div>
	);
};

export default PreencherVenda;
