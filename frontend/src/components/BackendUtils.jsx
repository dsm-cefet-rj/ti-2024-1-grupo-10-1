/* eslint-disable react-refresh/only-export-components */
import axios, { AxiosError } from "axios";

const PORT = 3015;
const URL = "http://localhost:" + PORT;

const user_endpoint = "/users";
const bike_endpoint = "/bike";
const feedback_endpoint = "/feedback";

// Bikes
export const fetchAllProducts = async (setTarget) => {
	//Busca todos os produtos (bicicletas) no back-end via a rota /bike
	try {
		const response = await axios.get(URL + bike_endpoint); //Faz uma requisição GET para buscar todos os produtos da API.

		if (response.status == 200) {
			await setTarget(response.data); //Se a resposta for 200 (sucesso), armazena os dados retornados na variável setTarget.
		} else {
			throw AxiosError.ERR_BAD_RESPONSE;
		}
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
	}
};

// Funcionalidade de Visualização de uma Bike com seu respectivo vendedor, caso usuário esteja logado
export const fetchProduct = async (id, return_owner_info = false) => {
	try {
		if (id !== null) {
			// Busca um produto específico (bicicleta) pelo id
			var response = await axios.get(URL + bike_endpoint + "/" + id); // Envia uma requisição GET para /bike/:id

			if (response.status == 200) {
				if (!return_owner_info) delete response.data.sellerData;

				return response.data; // Retorna o dado da bike, com ou sem os dados do vendedor
			} else {
				throw AxiosError.ERR_BAD_RESPONSE;
			}
		}
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
	}
};

export const postBike = async (bikeData) => {
	try {
		const token = localStorage.getItem("token"); // Obtém o token do localStorage

		const response = await axios.post(URL + bike_endpoint, bikeData, {
			headers: {
				Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
			},
		});

		if (response !== null) {
			if (response.status == 201) {
				return response.data;
			}
		}
	} catch (error) {
		// console.log(response.data);
		console.error("Erro ao criar a bicicleta:", error);
		throw error;
	}
};

export const patchBike = async (id, bikeData) => {
	try {
		const token = localStorage.getItem("token"); // Obtém o token do localStorage

		const response = await axios.patch(URL + bike_endpoint + "/" + id, bikeData, {
			headers: {
				Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
			},
		});

		return response.data;
	} catch (error) {
		// console.log(response.data);
		console.error("Erro ao criar a bicicleta:", error);
		throw error;
	}
};

export const removeBike = async (id) => {
	try {
		const token = localStorage.getItem("token"); // Obtém o token do localStorage
		const response = await axios.delete(URL + bike_endpoint + "/" + id, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (response !== null) {
			if (response.status == 200) {
				return true;
			}
		}
	} catch (error) {
		console.error("Erro ao criar a bicicleta:", error);

		throw error;
	}
};

// Usuário
export const fetchUsers = async (setTarget) => {
	//Busca todos os usuários cadastrados no sistema.
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

export const PostUser = async (newUser) => {
	// Envia dados de um novo usuário para o back-end (cadastrar um usuário).
	try {
		const response = await axios.post(URL + user_endpoint, newUser);

		// if (response !== null) {
		// 	if (response.status == 400 || response.status == 200) return response.data;
		// }
		return response;
	} catch (error) {
		console.error("Erro ao inserir novo usuario a lista de usuarios:", error);
	}
};

export const PatchUser = async (user_data) => {
	//Atualiza os dados de um usuário existente.
	try {
		const response = await axios.patch(URL + user_endpoint + "/" + user_data.id, user_data);
		return response;
	} catch (error) {
		console.error("Erro ao atualizar os dados do usuario:", error);
	}
};

//achar usuario
export const fetchUserData = async (token) => {
	try {
		const response = await axios.get(URL + user_endpoint + "/me/1", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return { status: 200, data: response.data };
	} catch (error) {
		if (error.response.status == 401) {
			return { status: 401, data: null };
		} else {
			console.log("Erro ao buscar dados do usuário", error);
			throw error;
		}
	}
};

// Feedbacks
// Função para buscar feedbacks do backend
export const fetchFeedbacks = async () => {
	try {
		const response = await axios.get(URL + feedback_endpoint);

		if (response !== null) {
			return response.data;
		} else {
			return [];
		}
	} catch (error) {
		console.error("Erro ao buscar feedbacks:", error);
		return [];
	}
};

// Função para criar um feedback
export const postFeedback = async (content, token) => {
	try {
		const response = await axios.post(
			URL + feedback_endpoint,
			{ content },
			{
				headers: {
					Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
					"Content-Type": "application/json",
				},
			}
		);
		return response.data; // Retorna a resposta da requisição
	} catch (error) {
		throw new Error(error.response?.data?.message || "Erro ao enviar o feedback.");
	}
};

// Auxiliares

export const fetchFavorites = async (token) => {
	try {
		// Busca um produto específico (bicicleta) pelo id
		const response = await axios.get(URL + user_endpoint + "/favorites/1", {
			headers: { Authorization: `Bearer ${token}` },
		}); // Envia uma requisição GET para /bike/:id

		if (response.status == 200) {
			return response.data;
		} else {
			throw AxiosError.ERR_BAD_RESPONSE;
		}
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
		return [];
	}
};

// NÃO MEXA NESTA CARALHA DE FUNÇÃO
export const fetchLogin = async (email, senha) => {
	try {
		// Faz a requisição POST para o endpoint de login
		const response = await axios.post(URL + user_endpoint + "/login", {
			email: email,
			senha: senha,
		});

		// Tratar a resposta de sucesso
		if (response.status === 200) {
			localStorage.setItem("token", response.data.token); //Usando armazenamento local do browser para fixar o token do usuario logado
			console.log("Login realizado com sucesso:", response.data);

			// console.log(localStorage.getItem("token")); // Verifique se o token está armazenado corretamente

			window.location.reload(); //GAMBIARRA PRA AUTENTICAÇÃO DO FRONT(HEADERHOME) FUNCIONAR (f5)

			return response.data;
		} else {
			return {};
		}
	} catch (error) {
		// Tratar os erros
		console.error("Erro ao tentar fazer login:", error.response ? error.response.data : error.message);
		// Você pode exibir uma mensagem de erro no frontend se desejar
		alert("Erro ao tentar fazer login, verifique suas credenciais.");
		return {};
	}
};

export const fetchProductsByUser = async (token) => {
	try {
		const ProductsFromUser = await axios.get(URL + bike_endpoint + "/productsFrom/1", {
			headers: { Authorization: `Bearer ${token}` },
		});

		if (ProductsFromUser.status == 200) {
			return ProductsFromUser.data;
		} else {
			throw AxiosError.ERR_BAD_RESPONSE;
		}
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
		return [];
	}
};

export const PatchFavorite = async (token, newFavs) => {
	try {
		const response = await axios.patch(
			URL + user_endpoint + "/123",
			{ FavIds: newFavs },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		console.log(response);
		if (response.status == 200) {
			return true;
		}
	} catch (error) {
		// if (error.response.status == 401) {

		// }
		console.log("Ocorreu um erro ao buscar os dados:", error);
		return false;
	}
};
