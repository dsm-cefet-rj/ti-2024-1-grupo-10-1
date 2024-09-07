import React, { useEffect, useState } from 'react';
import { fetchFeedbacks } from './BackendUtils'; // Função que faz a requisição para buscar feedbacks
import conor from '../assets/conor.png';
import biker from '../assets/biker.jpg';
import ironman from '../assets/ironman.png';
import chimaev from '../assets/chimaev.jpg';
import { Link } from 'react-router-dom';

const FeedbacksView = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const getFeedbacks = async () => {
            const data = await fetchFeedbacks();
            setFeedbacks(data.feedbacks); // A resposta tem a chave "feedbacks"
        };

        getFeedbacks();
    }, []);

    // Função para limitar feedbacks a 5 por linha
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    // Divide feedbacks em grupos de 5
    const feedbackRows = chunkArray(feedbacks, 5);

    return (
        <div className="py-8 w-full">
            <div className="space-y-6">
                {feedbackRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {row.map((feedback, index) => (
                            <div key={index} className="bg-purple-100 p-6 shadow rounded border border-black-500">
                                <div className="flex items-center border-b border-gray-200 pb-6">
                                    <img
                                        src={
                                            index === 0 ? conor :
                                            index === 1 ? biker :
                                            index === 2 ? ironman : chimaev
                                        }
                                        alt="user avatar"
                                        className="w-22 h-12 rounded-full"
                                    />
                                    <div className="flex items-start justify-between w-full">
                                        <div className="pl-3 w-full">
                                            <p className="text-xl font-medium leading-5 text-gray-800">
                                                {feedback.sellerData ? feedback.sellerData.nome : "Usuário desconhecido"}
                                            </p>
                                            {/* Exibe a data de publicação */}
                                            <p className="text-sm text-gray-500">
                                                Publicado em: {new Date(feedback.publication_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <p className="text-sm leading-5 py-4 text-gray-600">
                                        {feedback.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <Link to="/feedbackpost"> {/* Usando Link para navegação */}
                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        Postar um Feedback
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeedbacksView;
