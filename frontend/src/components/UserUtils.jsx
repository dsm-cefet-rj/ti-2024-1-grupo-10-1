import { create } from 'zustand';
import { produce } from 'immer';

const useUserStore = create((set) => ({

	// Estrut. Basica
	/*
		nome: 'Desconhecido',
		email: 'naoteinteressa@gmail.com',
		cep: '00000000',
		senha: '123456789',

		updateNome: (newNome) => set((state) => ({ nome: newNome })),
		updateCep: (newCep) => set((state) => ({ cep: newCep })),
		updateEmail: (newEmail) => set((state) => ({ email: newEmail })),
		updatePasswd: (newPass) => set((state) => ({ senha: newPass })),
	*/

	// Estado inicial do usuário
	user: {
		id: 1,
		profile: {
			nome: "Desconhecido",
			email: "naoteinteressa@gmail.com",
			cep: "12345678"
		},
		passwd: "1234"
	},

	// Funçoes de alteração de estado --> Podem ser simplificadas com immer
	// updateNome: (newNome) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		profile: {
	// 			...state.user.profile,
	// 			name: newNome,
	// 		}
	// 	}
	// })),

	// updateEmail: (newEmail) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		profile: {
	// 			...state.user.profile,
	// 			email: newEmail,
	// 		}
	// 	}
	// })),

	// updateCep: (newCep) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		profile: {
	// 			...state.user.profile,
	// 			cep: newCep,
	// 		}
	// 	}
	// })),

	// updatePass: (newpass) => set((state) => ({
	// 	user: {
	// 		...state.user,
	// 		passwd: newpass
	// 	}
	// })),

	// Funçoes de alteração de estado com immer
	updateNome: (newNome) => set(produce((state) => { state.user.profile.nome = newNome; })),

	updateEmail: (newEmail) => set(produce((state) => { state.user.profile.email = newEmail; })),

	updateCep: (newCep) => set(produce((state) => { state.user.profile.cep = newCep; })),

	updatePass: (newPass) => set(produce((state) => { state.user.passwd = newPass; })),

}));

export default useUserStore;
