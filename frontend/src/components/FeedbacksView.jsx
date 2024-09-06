import React, { useEffect, useState } from 'react';
// import { fetchFeedbacks, fetchUser } from './BackendUtils'; // Importando a função de BackendUtils
import conor from '../assets/conor.png';
import biker from '../assets/biker.jpg';
import ironman from '../assets/ironman.png';
import chimaev from '../assets/chimaev.jpg';

const FeedbacksView = () => {
    // const [feedbacks, setFeedbacks] = useState([]);
    // const [userNames, setUserNames] = useState({});

    // useEffect(() => {
    //     const getFeedbacks = async () => {
    //         // Busca todos os feedbacks
    //         const data = await fetchFeedbacks();
    //         setFeedbacks(data);

    //         // Busca nomes dos usuários com base no userId de cada feedback
    //         const names = {};
    //         const fetchNames = data.map(async (feedback) => {
    //             if (feedback.userId) {
    //                 // Usando fetchUser para buscar o usuário
    //                 await fetchUser(feedback.userId, (user) => {
    //                     if (user && user.nome) {
    //                         names[feedback.userId] = user.nome;
    //                     } else {
    //                         names[feedback.userId] = 'Usuário desconhecido';
    //                     }
    //                 });
    //             }
    //         });
    //         await Promise.all(fetchNames); // Aguarda todas as promessas serem resolvidas
    //         setUserNames(names);
    //     };

    //     getFeedbacks();
    // }, []);

    return (
        <div className="py-8 w-full">
            <div className="lg:flex items-center justify-center w-full">
                {/* Exibindo feedbacks que vieram do banco */}
                {feedbacks.map((feedback, index) => (
                    <div key={index} className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-purple-100 p-6 shadow rounded border border-black-500">
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
                                        {userNames[feedback.userId] || "Nome manual"}
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

            {/* Botão para postar um feedback */}
            <div className="flex justify-center mt-4">
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Postar um Feedback
                </button>
            </div>
        </div>
    );
};

export default FeedbacksView;
