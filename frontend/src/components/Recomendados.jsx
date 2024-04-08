import React from 'react'
//import speed from '../assets/bike2.jpg'
import speed2 from '../assets/speed3.jpg'
import passeio from '../assets/passeio.jpg'
import MTB from '../assets/MTB.jpg'


const Recomendados = () => {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 mt-14">
			{/* Primeira bicicleta recomendada */}
			<div className="relative bg-black">
				<img src={speed2} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $10000</p>
					<p className="text-sm">Bicicleta Rav2r Speed Carbono Aro 700 Kit.</p>
				</div>
			</div>

			<div className="relative bg-black">
				<img src={passeio} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $800</p>
					<p className="text-sm">Bicicleta Rav2r Speed Carbono Aro 700 Kit.</p>
				</div>

			</div>
			<div className="relative bg-black">
				<img src={MTB} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $1900</p>
					<p className="text-sm">Bicicleta Rav2r Speed Carbono Aro 700 Kit.</p>
				</div>
			</div>

			<div className="relative bg-black">
				<img src={speed2} className="object-cover w-full h-72" />
				<div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
					<p className="text-lg">Preço: $1000</p>
					<p className="text-sm">Bicicleta Rav2r Speed Carbono Aro 700 Kit.</p>
				</div>
			</div>

		</div>

	)
}


export default Recomendados
