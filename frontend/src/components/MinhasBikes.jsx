import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListaMinhasBikes = () => {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBikes = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Você precisa estar logado para ver suas bicicletas.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:3015/bike/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setBikes(response.data);
            } catch (err) {
                setError('Ocorreu um erro ao carregar minhas bicicletas.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBikes();
    }, []);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Minhas Bicicletas:</h2>

                {loading ? (
                    <p className="text-lg text-gray-700 mt-4">Carregando...</p>
                ) : error ? (
                    <p className="text-lg text-red-700 mt-4">{error}</p>
                ) : bikes.length === 0 ? (
                    <p className="text-lg text-gray-700 mt-4">Você ainda não postou nenhuma bicicleta.</p>
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                        {bikes.map((bike) => (
                            <Link
                                to={`/bike/${bike.bikeId}`}
                                key={bike.bikeId}
                                className="relative bg-black border border-black">
                                <img
                                    src={bike.imagem}
                                    alt={bike.title}
                                    className="object-cover w-full h-72"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-75 text-white px-4 py-2">
                                    <p className="text-lg font-medium">Preço: {`R$ ${bike.price.toFixed(2)}`}</p>
                                    <p className="text-sm mt-1 h-10 overflow-hidden text-ellipsis">{bike.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListaMinhasBikes;
