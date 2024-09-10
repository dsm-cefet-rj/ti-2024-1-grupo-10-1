import { useState } from "react";
import { postFeedback } from "./BackendUtils"; // Importa a função postFeedback
import { useNavigate } from "react-router-dom";

const MenuFeedBack = () => {
	const [feedback, setFeedback] = useState("");
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const token = localStorage.getItem("token"); // Obtém o token do localStorage
		console.log(token);
		if (!token) {
			setError("Você precisa estar logado para postar um feedback.");
			return;
		}

		try {
			const result = await postFeedback(feedback, token); // Usa a função postFeedback
			setSuccess("Feedback enviado com sucesso!");
			setFeedback(""); // Limpa o campo de feedback
			console.log(result); // Opcional: imprime a resposta no console
			navigate("/feedback");
		} catch (error) {
			setError(error.message); // Define a mensagem de erro
			console.error(error); // Opcional: imprime o erro no console
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12 border border-gray-300">
			<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md bg-white border border-gray-300 rounded-lg">
				<h1 className="text-center text-2xl mb-5">Deixe seu feedback sobre sua experiência com o site</h1>
				<form
					className="bg-white shadow w-full rounded-lg divide-y divide-gray-300 border border-gray-300"
					onSubmit={handleSubmit}
				>
					<div className="px-9 py-12">
						<label className="font-semibold text-sm text-gray-600 pb-1 block">Feedback</label>
						<textarea
							className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							required
						/>
						<button
							type="submit"
							className="transition duration-200 bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 
                            focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm
                            shadow-sm hover:shadow-md font-semibold text-center inline-block"
						>
							Postar Feedback
						</button>
						{error && <p className="text-red-500 mt-4">{error}</p>}
						{success && <p className="text-green-500 mt-4">{success}</p>}
					</div>
				</form>
			</div>
		</div>
	);
};

export default MenuFeedBack;
