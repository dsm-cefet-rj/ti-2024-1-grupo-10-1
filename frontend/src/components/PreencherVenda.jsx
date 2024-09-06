import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa o axios para fazer requisições HTTP
import camera from '../assets/cameraIcon.png';

const PreencherVenda = ({ anuncio, handleSubmit, handleDelete }) => {  
  const [titulo, setTitulo] = useState(anuncio?.titulo || '');
  const [descricao, setDescricao] = useState(anuncio?.descricao || '');
  const [valor, setValor] = useState(anuncio?.valor || '');
  const [images, setImages] = useState(anuncio?.images || Array(5).fill(null));

  const navigate = useNavigate();

  const handleImageChange = (index, event) => {
    const selectedImage = event.target.files[0];
    const updatedImages = [...images];
    updatedImages[index] = URL.createObjectURL(selectedImage);
    setImages(updatedImages);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = anuncio
        ? await axios.put(`/api/announcements/${anuncio._id}`, { titulo, descricao, valor, images })
        : await axios.post('/api/announcements', { titulo, descricao, valor, images });
      
      alert('Anúncio salvo com sucesso!');
      navigate('/conta');
    } catch (error) {
      console.error('Erro ao salvar anúncio', error);
      alert('Erro ao salvar anúncio');
    }
  };

  useEffect(() => {
    if (anuncio) {
      setTitulo(anuncio.titulo);
      setDescricao(anuncio.descricao);
      setValor(anuncio.valor);
      setImages(anuncio.images);
    }
  }, [anuncio]);

  return (
    <div>
      <form className="mt-10 max-w-lg mx-auto" onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título<span className='text-red-500 inline-block'>*</span></label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5" required />

          <label className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição<span className='text-red-500 inline-block'>*</span></label>
          <input value={descricao} onChange={(e) => setDescricao(e.target.value)} className="h-20 bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" required />

          <label className="mt-7 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor(R$)<span className='text-red-500 inline-block'>*</span></label>
          <input value={valor} onChange={(e) => setValor(e.target.value)} className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5" required />
        </div>

        <div className="grid grid-cols-1 gap-4">
          Fotos:
          <label htmlFor="main-photo" className="relative w-full border-dashed border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer flex justify-center items-center">
            <img src={images[0] || camera} alt="Foto Principal" className="w-30 h-30 object-cover" />
            <input type="file" id="main-photo" accept="image/*" className="absolute inset-0 opacity-0" onChange={(e) => handleImageChange(0, e)} />
          </label>
          
          {[...Array(4)].map((_, index) => (
            <label key={index + 1} htmlFor={`additional-photo-${index + 1}`} className="relative w-full border-dashed border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer flex justify-center items-center">
              <img src={images[index + 1] || camera} alt={`Foto ${index + 1}`} className="w-30 h-30 object-cover" />
              <input type="file" id={`additional-photo-${index + 1}`} accept="image/*" className="absolute inset-0 opacity-0" onChange={(e) => handleImageChange(index + 1, e)} />
            </label>
          ))}
        </div>

        <button type="submit" className="mb-10 mt-7 text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">
          {anuncio ? 'Salvar Alterações' : 'Anunciar Bike'}
        </button>

        {anuncio && (
          <button type="button" onClick={() => handleDelete(anuncio._id)} className="mb-10 mt-3 text-white bg-red-500 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5">
            Remover Anúncio
          </button>
        )}
      </form>
    </div>
  );
};

export default PreencherVenda;
