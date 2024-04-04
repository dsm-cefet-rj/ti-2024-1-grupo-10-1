import React, { useState } from 'react';
import camera from '../assets/cameraIcon.png'; //

const PreencherVenda = () => {
  const [images, setImages] = useState(Array(5).fill(null)); // Array para armazenar as imagens selecionadas

  const handleImageChange = (index, event) => {
    const selectedImage = event.target.files[0]; // Seleciona apenas a primeira imagem
    const updatedImages = [...images];
    updatedImages[index] = URL.createObjectURL(selectedImage); // Armazena a URL da imagem selecionada
    setImages(updatedImages);
  };

  return (
    <div>
      <form className="mt-10 max-w-lg mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título*</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        
          <label className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição*</label>
          <input className="h-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ex: 'Bicicleta Rav2r Speed Carbono Aro 700 Kit.'" required />

          <label className="mt-7 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Preço (R$)*</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        {/* Espaços para inserir fotos */}
        <div className="grid grid-cols-1 gap-4">

          
          Fotos:
          <label htmlFor="main-photo" className="relative col-span-3 md:col-span-1 w-full border-dashed border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer flex justify-center items-center">
            <img src={images[0] || camera} alt="Foto Principal" className="w-30 h-30 object-cover" />
            <input type="file" id="main-photo" accept="image/*" className="absolute inset-0 opacity-0" onChange={(e) => handleImageChange(0, e)} />
          </label>

          
          {[...Array(4)].map((_, index) => (
            <label key={index + 1} htmlFor={`additional-photo-${index + 1}`} className="relative w-full border-dashed border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer flex justify-center items-center">
              <img src={images[index + 1] || camera} alt={`Foto ${index + 1}`} className="w-30 h-30  object-cover" />
              <input type="file" id={`additional-photo-${index + 1}`} accept="image/*" className="absolute inset-0 opacity-0" onChange={(e) => handleImageChange(index + 1, e)} />
            </label>
          ))}
        </div>

        <label className="mt-7 block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP*</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

        <button type="submit" className="mb-10 mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar Bike</button>
      </form>
    </div>
  );
};

export default PreencherVenda;
