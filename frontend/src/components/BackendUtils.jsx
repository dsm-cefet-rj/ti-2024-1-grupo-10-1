// TODO: Implementar objeto do axios - configurações


import axios from "axios";

const PORT = 3015;
const URL = "http://localhost:" + PORT;

const user_endpoint ="/users";
const bike_endpoint = "/bike";
const feedback_endpoint = "/feedback";


export const fetchAllProducts = async (setTarget) => {
	try {
		const response = await axios.get(URL + bike_endpoint);
		if (response.status == 200) await setTarget(response.data);
		else throw AxiosError.ERR_BAD_RESPONSE;
	} catch (error) {
		console.error('Ocorreu um erro ao buscar os dados:', error);

	}
};

export const fetchProduct = async (setTarget, id) => {
	try {
		const response = await axios.get(URL + bike_endpoint, { params: { id_bike: id } });
		if (response.status == 200) await setTarget(response.data[0]);
		else throw AxiosError.ERR_BAD_RESPONSE;
	} catch (error) {
		console.error('Ocorreu um erro ao buscar os dados:', error);

	}
};

export const fetchUser = async (setTarget, userid) => {
	try {
		const response = await axios.get(URL + user_endpoint +`${userid}`);
		setTarget(response.data);
		
	} catch (error) {
		console.error('Ocorreu um erro ao buscar os dados:', error);

	}
};

export const fetchUsers = async (setTarget) => {
	try {
		const response = await axios.get(URL + "/users");
		if (response.status == 200) await setTarget(response.data);
	} catch (error) {
		console.error('Erro ao buscar lista de usuarios:', error);
	}
};

export const PostUser = async (newUser) => {

	try {
		const response = await axios.post(URL + "/users", newUser);
		// Verificar se a resposta do backend foi correta
	} catch (error) {
		console.error('Erro ao inserir novo usuario a lista de usuarios:', error);
	}
};

export const PutUser = async (user_data) => {
	
	try {
		const response = await axios.patch(URL + user_endpoint + "/" + user_data.id, user_data);

	} catch (error) {
		console.error('Erro ao atualizar os dados do usuario:', error);
	}
	
};



export const fetchFeedbacks = async () => {
	try {
		const resp = await axios.get(URL + feedback_endpoint);
		// if (response.status == 200) await setTarget(response.data);
	} catch (error) {
		console.error('Erro ao carregar os feedbacks dos usuários:', error);
		
	}
};