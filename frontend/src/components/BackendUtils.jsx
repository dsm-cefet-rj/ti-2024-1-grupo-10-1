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
export const fetchProduct = async (setTarget, id) => {
	try {
		if (id !== null) {
			// Busca um produto específico (bicicleta) pelo id
			const response = await axios.get(URL + bike_endpoint + "/" + id); // Envia uma requisição GET para /bike/:id

			if (response.status == 200) {
				await setTarget(response.data); //se bem-sucedida, define o estado com os dados do produto específico.
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

		return response.data;
	} catch (error) {
		// console.log(response.data);
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
		// Verificar se a resposta do backend foi correta
		// if (response.status == 200) {
		// 	// return ?
		// }
		// else {
		// 	throw AxiosError.ERR_BAD_RESPONSE;
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

export const handleLogout = () => {
	// Remover o token JWT armazenado
	localStorage.removeItem("token");

	// Redirecionar para a página de login ou inicial
	window.location.href = "/login"; // ou use react-router para redirecionar
};

//achar usuario
export const fetchUserData = async () => {
	try {
		const response = await axios.get(URL + user_endpoint + "/me", {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		});
		return response.data;
	} catch (error) {
		console.error("Erro ao buscar dados do usuário", error);
		throw error;
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

export const fetchFavorites = async (id) => {
	try {
		// Busca um produto específico (bicicleta) pelo id
		const response = await axios.get(URL + user_endpoint + "/favorites/" + id); // Envia uma requisição GET para /bike/:id

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

			// window.location.reload(); //GAMBIARRA PRA AUTENTICAÇÃO DO FRONT(HEADERHOME) FUNCIONAR (f5) - Não funciona.....

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

export const fetchProductsByUser = async (id) => {
	try {
		if (id !== null) {
			const ProductsFromUser = await axios.get(URL + bike_endpoint + "/productsFrom/" + id);

			if (ProductsFromUser.status == 200) {
				return ProductsFromUser.data;
			} else {
				throw AxiosError.ERR_BAD_RESPONSE;
			}
		}
	} catch (error) {
		console.error("Ocorreu um erro ao buscar os dados:", error);
		return [];
	}
};
