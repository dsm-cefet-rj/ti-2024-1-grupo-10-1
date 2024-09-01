// TODO: Implementar objeto do axios - configurações

import axios from "axios";

const PORT = 3015;
const URL = "http://localhost:" + PORT;

const user_endpoint = "/users";
const bike_endpoint = "/bike";
const feedback_endpoint = "/feedback";

export const fetchAllProducts = async (setTarget) => {//Busca todos os produtos (bicicletas) no back-end via a rota /bike
	try {
		const response = await axios.get(URL + bike_endpoint);//Faz uma requisição GET para buscar todos os produtos da API.

		if (response.status == 200) {
			await setTarget(response.data);//Se a resposta for 200 (sucesso), armazena os dados retornados na variável setTarget.
		} else {
			throw AxiosError.ERR_BAD_RESPONSE;
		}
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
	}
};

export const fetchProduct = async (setTarget, id) => {// Busca um produto específico (bicicleta) pelo id
	try {
		const response = await axios.get(URL + bike_endpoint + "/" + id);// Envia uma requisição GET para /bike/:id

		if (response.status == 200) {
			await setTarget(response.data);//se bem-sucedida, define o estado com os dados do produto específico.
		} else {
			throw AxiosError.ERR_BAD_RESPONSE;
		}
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
	}
};

export const fetchUser = async (setTarget, userid) => {//Busca dados de um usuário específico pelo userid
	try {
		const response = await axios.get(URL + user_endpoint + `${userid}`);//Requisição GET para /users/:userid e atualiza o estado com os dados do usuário.
		setTarget(response.data);
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
	}
};

export const fetchUsers = async (setTarget) => {//Busca todos os usuários cadastrados no sistema.
	try {
		const response = await axios.get(URL + user_endpoint);
		if (response.status == 200) {
			await setTarget(response.data);
		} else {
			throw AxiosError.ERR_BAD_RESPONSE;
		}
	} catch (error) {
		console.error("Erro ao buscar lista de usuarios:", error);
	}
};

export const PostUser = async (newUser) => {// Envia dados de um novo usuário para o back-end (cadastrar um usuário).
	try {
		const response = await axios.post(URL + user_endpoint, newUser);
		// Verificar se a resposta do backend foi correta
		// if (response.status == 200) {
		// 	// return ?
		// }
		// else {
		// 	throw AxiosError.ERR_BAD_RESPONSE;
		// }
		return response;
	} catch (error) {
		console.error(
			"Erro ao inserir novo usuario a lista de usuarios:",
			error
		);
	}
};

export const PutUser = async (user_data) => {//Atualiza os dados de um usuário existente.
	try {
		const response = await axios.patch(
			URL + user_endpoint + "/" + user_data.id,
			user_data
		);
		return response;
	} catch (error) {
		console.error("Erro ao atualizar os dados do usuario:", error);
	}
};

export const fetchFeedbacks = async () => {
	try {
		const resp = await axios.get(URL + feedback_endpoint);
		// if (response.status == 200) await setTarget(response.data);
		return resp;
	} catch (error) {
		console.error("Erro ao carregar os feedbacks dos usuários:", error);
	}
};
