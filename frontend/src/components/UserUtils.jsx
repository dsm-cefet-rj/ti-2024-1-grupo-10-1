import { create } from 'zustand';

const defaultUserStore = create((set) => ({
	// Estado inicial do usuário
	user: {
		nomeCompleto: '',
		cep: '',
		email: '',
		senha: ''
	},

	// Função para atualizar o nome completo do usuário
	setNomeCompleto: (nomeCompleto) => set((state) => ({
		user: {
			...state.user,
			nomeCompleto
		}
	})),

	// Função para atualizar o CEP do usuário
	setCep: (cep) => set((state) => ({
		user: {
			...state.user,
			cep
		}
	})),

	// Função para atualizar o email do usuário
	setEmail: (email) => set((state) => ({
		user: {
			...state.user,
			email
		}
	})),

	// Função para atualizar a senha do usuário
	setSenha: (senha) => set((state) => ({
		user: {
			...state.user,
			senha
		}
	}))
}));

export default defaultUserStore;
