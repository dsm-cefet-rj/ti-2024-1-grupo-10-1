import { create } from 'zustand';


const useUserStore = create((set) => ({
	// Estado inicial do usuário

	// Estrut. Basica

	/**
	 * 
	
	user: {
		id: 0,
		profile: {
			name: "",
			email: "",
			passwd: ""
		}
	}
	
	*/



	nome: 'Desconhecido',
	cep: '00000000',
	email: 'naoteinteressa@gmail.com',
	senha: '123456789',

	updateNome: (newNome) => set((state) => ({ nome: newNome })),
	updateNome: (newCep) => set((state) => ({ cep: newCep })),
	updateNome: (newEmail) => set((state) => ({ email: newEmail })),
	updateNome: (newPass) => set((state) => ({ senha: newPass })),

	// Função para atualizar o nome completo do usuário
	// setNomeCompleto: (newnomeCompleto) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		nomeCompleto
	// 	}
	// 	// user: { nomeCompleto: state.newnomeCompleto }
	// })),

	// // Função para atualizar o CEP do usuário
	// setCep: (cep) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		cep
	// 	}
	// })),

	// // Função para atualizar o email do usuário
	// setEmail: (email) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		email
	// 	}
	// })),

	// // Função para atualizar a senha do usuário
	// setSenha: (senha) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		senha
	// 	}
	// }))
}));

export default useUserStore;
