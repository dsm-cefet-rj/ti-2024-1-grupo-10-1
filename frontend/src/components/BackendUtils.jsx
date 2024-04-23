import axios from "axios";


const PORT = 3000;
const URL = "http://localhost:" + PORT;


export const fetchProducts = async (setTarget) => {
	try {
		const response = await axios.get(URL + "/bike");
		if (response.status == 200) await setTarget(response.data);
		else throw AxiosError.ERR_BAD_RESPONSE;
	} catch (error) {
		console.error('Ocorreu um erro ao buscar os dados:', error);

	}
}

export const fetchUsers = async (setTarget) => {
	try {
		const response = await axios.get(URL + "/users");
		if (response.status == 200) await setTarget(response.data);
	} catch (error) {
		console.error('Erro ao buscar lista de usuarios:', error);
	}
};