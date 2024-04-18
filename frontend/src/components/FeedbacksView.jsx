import React from 'react'
import { Link } from 'react-router-dom';
import conor from '../assets/conor.png'
import biker from '../assets/biker.jpg'
import ironman from '../assets/ironman.png'
import chimaev from '../assets/chimaev.jpg'


const FeedbacksView = () => {
          return (
              <div className="py-8 w-full">
                  <div className="lg:flex items-center justify-center w-full">

                      <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
                          <div className="flex items-center border-b border-gray-200 pb-6">
                              <img src={conor} alt className="w-22 h-12 rounded-full" />
                              <div className="flex items-start justify-between w-full">
                                  <div className="pl-3 w-full">
                                      <p className="text-xl font-medium leading-5 text-gray-800">Conor beats Aldo</p>
                                  </div>
                              </div>
                          </div>
                          <div className="px-2">
                              <p className="text-sm leading-5 py-4 text-gray-600">Estou adorando a experiência no BikeSellers! É incrível poder encontrar uma variedade tão grande de bicicletas para todos os gostos e necessidades. Além disso, a possibilidade de marcar encontros diretamente com os vendedores facilita muito o processo de compra. Recomendo totalmente!.</p>
                          </div>
                      </div>



                      <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
                          <div className="flex items-center border-b border-gray-200 pb-6">
                              <div className="flex items-start justify-between w-full">
                                  <img src={biker} alt className="w-22 h-12 rounded-full" />
                                  <div className="pl-3 w-full">
                                      <p className="text-xl font-medium leading-5 text-gray-800">Mariana Lemos</p>
                                  </div>
                              </div>
                          </div>
                          <div className="px-2">
                              <p className="text-sm leading-5 py-4 text-gray-600">O BikeSellers é simplesmente fantástico! Encontrei a bicicleta em poucos minutos. Estou muito satisfeito com minha experiência aqui!.</p>
                          </div>
                      </div>
                  </div>


                 
                  <div className="lg:flex items-center justify-center w-full mt-7">

                      <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
                          <div className="flex items-center border-b border-gray-200 pb-6">
                              <img src={ironman} alt className="w-12 h-12 rounded-full" />
                              <div className="flex items-start justify-between w-full">
                                  <div className="pl-3 w-full">
                                      <p className="text-xl font-medium leading-5 text-gray-800">Alexandre</p>
                                  </div>
                              </div>
                          </div>
                          <div className="px-2">
                              <p className="text-sm leading-5 py-4 text-gray-600">Que ótima plataforma o BikeSellers para comprar e vender bicicletas! Desde o primeiro contato com o vendedor até o momento de marcar o encontro para conferir a bike, tudo foi super tranquilo e eficiente. A variedade de opções disponíveis é impressionante e os anúncios são bem detalhados. Recomendo a todos os amantes de bicicletas!.</p>
                          </div>
                      </div>


                      <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded">
                          <div className="flex items-center border-b border-gray-200 pb-6">
                              <img src={chimaev} alt className="w-22 h-12 rounded-full" />
                              <div className="flex items-start justify-between w-full">
                                  <div className="pl-3 w-full">
                                      <p className="text-xl font-medium leading-5 text-gray-800">Chimaev Bully Weight</p>
                                  </div>
                              </div>
                          </div>
                          <div className="px-2">
                              <p className="text-sm leading-5 py-4 text-gray-600">Foi uma excelente decisão anunciar minha bicicleta no BikeSellers! Consegui encontrar um comprador em pouco tempo e o processo todo foi muito tranquilo. Estou muito feliz com a venda e definitivamente recomendo esta plataforma a outros vendedores!.</p>
                      </div>
                  </div>
              </div>
                  {/* Adicione um botão para "Postar um Feedback" */}
                  <div className="flex justify-center mt-4">
                      <Link to="/feedbackpost" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Postar um Feedback
                      </Link>
                  </div>
            </div>
          );
      };


export default FeedbacksView