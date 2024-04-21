import React from 'react'
import montanha from '../assets/montanha.png';
import estrada from '../assets/estrada.png';
import guardaSol from '../assets/guardaSol.png';
import eletrica from '../assets/eletrica.png';
import { Link } from 'react-router-dom';
import useBikeStore from '../store';


const Options = () => {
	const setSelectedBikeType = useBikeStore((state) => state.setSelectedBikeType);//mudar tipo da bike ao clicar em certo botão 

	const handleButtonClick = (bikeType) => {
		setSelectedBikeType(bikeType);
	};

	return (
		<nav className="w-full flex-grow mx-1">
			<ul className="flex flex-wrap mt-3">
				<li className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
					<Link
						to="/bike"
						className="w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => handleButtonClick('MTB')}
					>
						<img src={montanha} alt="Mountain" className="w-8 h-8 mr-2" />
						<span className="text-black">MTB</span>
					</Link>
				</li>
				<li className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
					<Link
						to="/bike"
						className="w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => handleButtonClick('Speed')}
					>
						<img src={estrada} alt="Road" className="w-8 h-8 mr-2" />
						<span className="text-black">Speed</span>
					</Link>
				</li>
				<li className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
					<Link
						to="/bike"
						className="w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => handleButtonClick('Passeio')}
					>
						<img src={guardaSol} alt="Beach" className="w-8 h-8 mr-2" />
						<span className="text-black">Passeio</span>
					</Link>
				</li>
				<li className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
					<Link
						to="/bike"
						className="w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						onClick={() => handleButtonClick('Eletrica')}
					>
						<img src={eletrica} alt="Eletric" className="w-8 h-8 mr-2" />
						<span className="text-black">Elétrica</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Options;
