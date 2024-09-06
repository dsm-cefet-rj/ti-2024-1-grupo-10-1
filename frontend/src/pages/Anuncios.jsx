import React, { useState } from 'react';
import HeaderVenda from '../components/HeaderVenda';
import MeioVendas from '../components/MeioVendas';
import PreencherVenda from '../components/PreencherVenda';

// Componente Anuncios
const Anuncios = () => {
  const [anuncio, setAnuncio] = useState(null); // Estado para armazenar o anúncio atual (se houver)

  // Função para criar ou atualizar um anúncio
  const handleCreateOrUpdate = (anuncioData) => {
    if (anuncio) {
      // Lógica para atualizar o anúncio existente
      console.log('Atualizando anúncio:', anuncioData);
      // Atualize o estado ou envie uma requisição ao backend para atualizar o anúncio
    } else {
      // Lógica para criar um novo anúncio
      console.log('Criando novo anúncio:', anuncioData);
      // Envie uma requisição ao backend para criar um novo anúncio
    }
    // Limpe o estado de anúncio após a operação
    setAnuncio(null);
  };

  // Função para remover um anúncio
  const handleDelete = (anuncioId) => {
    console.log('Removendo anúncio com ID:', anuncioId);
    // Envie uma requisição ao backend para remover o anúncio
    // Limpe o estado de anúncio após a remoção
    setAnuncio(null);
  };

  return (
    <div>
      <HeaderVenda />
      <MeioVendas />
      <PreencherVenda
        anuncio={anuncio}
        handleSubmit={handleCreateOrUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Anuncios;
