import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from './BackendUtils';



const Recomendados = () => {
	
	const [produtos, setProdutos] = useState([]);
	

	useEffect(() => {
		fetchAllProducts(setProdutos);
	}, []);

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 mt-10 mx-5">
			{produtos.map((produto) => (
				<Link key={produto.id_bike} to={`/bike/${produto.id_bike}`} className="relative bg-black">
					<img src={produto.imagem} className="object-cover w-full h-72" alt={produto.titulo} />
					<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
						<p className="text-lg">Preço: {produto.valor}</p>
						<p className="text-sm">{produto.descricao}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Recomendados;
