import React from 'react'
import montanha from '../assets/montanha.png';
import estrada from '../assets/estrada.png';
import guardaSol from '../assets/guardaSol.png';
import eletrica from '../assets/eletrica.png';

const Options = () => {

    return (
      <nav className='w-full flex-grow'>
        <ul className='flex flex-wrap -mx-2 mt-7'>
          <li className='w-full sm:w-1/2 md:w-1/4 px-2 mb-4'>
            <a href="#" className="w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <img src={montanha} alt="Mountain" className="w-8 h-8 mr-2" />
              <span className="text-black">MTB</span>
            </a>
          </li>
          <li className='w-full sm:w-1/2 md:w-1/4 px-2 mb-4'>
            <a href="#" className=" w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <img src={estrada} alt="Road" className="w-8 h-8 mr-2" />
              <span className="text-black">Speed</span>
            </a>
          </li>
          <li className='w-full sm:w-1/2 md:w-1/4 px-2 mb-4'>
            <a href="#" className=" w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <img src={guardaSol} alt="Beach" className="w-8 h-8 mr-2" />
              <span className="text-black">Passeio</span>
            </a>
          </li>
          <li className='w-full sm:w-1/2 md:w-1/4 px-2 mb-4'>
            <a href="#" className=" w-full h-20 flex items-center justify-center px-6 leading-tight text-gray-500 bg-purple-200 border border-black hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <img src={eletrica} alt="Eletric" className="w-8 h-8 mr-2" />
              <span className="text-black">Elétrica</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  };
  

export default Options