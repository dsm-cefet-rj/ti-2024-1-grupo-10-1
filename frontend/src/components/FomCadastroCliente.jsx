import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FormCliente() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        CEP: '',
        senha: '',
        FavCollection: [],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/users', formData);
            setFormData({
                nome: '',
                email: '',
                telefone: '',
                CEP: '',
                senha: '',
                FavCollection: [],
            });
            alert('Usuário criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário. Verifique o console para mais detalhes.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='min-w-96'>
            <div className="border border-gray-300 rounded-lg p-4">
                <div id="clientForm" className="grid place-content-center">
                    <form onSubmit={handleSubmit}>
                        <div className="border-b border-gray-900/10 pb-7">
                            <h1 className="text-base font-semibold leading-7 text-gray-900">Dados Cadastrais</h1>
                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 ">
                                <div className="sm:col-span-2 mt-2">
                                    <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">Nome Completo</label>
                                    <input type="text" name="nome" id="nome" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required value={formData.nome} onChange={handleChange} />
                                </div>
                                <div className="mt-2 sm:col-start-1">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Endereço de Email</label>
                                    <input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required value={formData.email} onChange={handleChange} />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="telefone" className="block text-sm font-medium leading-6 text-gray-900">Telefone</label>
                                    <input type="tel" name="telefone" id="telefone" autoComplete="tel" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required value={formData.telefone} onChange={handleChange} />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="CEP" className="block text-sm font-medium leading-6 text-gray-900">CEP</label>
                                    <input type="text" pattern='[0-9]{8}' name="CEP" id="CEP" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required value={formData.CEP} onChange={handleChange} />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="senha" className="block text-sm font-medium leading-6 text-gray-900">Senha de Login</label>
                                    <input type="password" name="senha" id="senha" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required value={formData.senha} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center justify-end gap-x-6">
                            <button type="button" className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> <Link to="/home"><span className="inline-block mr-2">Cancel</span></Link></button>
                            <button type="submit" className="rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><span className="inline-block mr-2">Save</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
