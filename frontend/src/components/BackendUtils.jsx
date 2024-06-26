// TODO: Implementar objeto do axios - configurações


import axios from "axios";

const PORT = 3000;
const URL = "http://localhost:" + PORT;

const user_endpoint = URL + "/users";
const bike_endpoint = URL + "/bike";


export const fetchAllProducts = async (setTarget) => {
	try {
		const response = await axios.get(URL + "/bike");
		if (response.status == 200) await setTarget(response.data);
		else throw AxiosError.ERR_BAD_RESPONSE;
	} catch (error) {
		console.error('Ocorreu um erro ao buscar os dados:', error);

	}
};

export const fetchProduct = async (setTarget, id) => {
	try {
		const response = await axios.get(URL + "/bike", { params: { id_bike: id } });
		if (response.status == 200) await setTarget(response.data[0]);
		else throw AxiosError.ERR_BAD_RESPONSE;
	} catch (error) {
		console.error('Ocorreu um erro ao buscar os dados:', error);

	}
};

export const fetchUser = async (setTarget, userid) => {
	try {
		const response = await axios.get(`http://localhost:3000/users/${userid}`);
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
		// Fazer algo com o response
	} catch (error) {
		console.error('Erro ao inserir novo usuario a lista de usuarios:', error);
	}
};

export const PutUser = async (user_data) => {
	
	try {
		const response = await axios.put(user_endpoint + "/" + user_data.id, user_data);

	} catch (error) {
		console.error('Erro aoatualizar os dados do usuario:', error);
		
	}
	
};