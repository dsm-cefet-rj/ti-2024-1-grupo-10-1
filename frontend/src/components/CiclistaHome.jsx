import React from 'react'
import imagem from '../assets/imagemCentral.png'


const CiclistaHome = () => {
	return (
		<div>
			<div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 mt-14 overflow-hidden">
				<img src={imagem} className="object-cover w-full h-full" alt="Imagem" />
			</div>

			<div className="mt-[638px] absolute inset-0 flex items-center justify-center z-10">
				<a href="#" className="mt-2 sm:mt-6 md:mt-16 max-w-sm p-5 bg-white border border-black rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
					<h5 className="mb-2 text-lg sm:text-xl md:text-2xl tracking-tight text-gray-900 dark:text-white">Recomendados pra você</h5>
				</a>
			</div>
		</div>
	);

}

export default CiclistaHome