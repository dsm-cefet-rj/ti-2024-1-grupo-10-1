var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var Usuario = require("../models/user.schema")

router.route("/")
	// Listagem de usuarios.
	.get((req, res, next) => {
		Usuario.find({}).then((data) => {
			res.json(data);
		}).catch((err) => {
			res.json({ "status": "ERROR", "message": err.message });
			next();
		});
	})

	// Adicionar usuário
	.post(async (req, res, next) => {
		try {
			const { nome, CEP, email, senha, telefone } = req.body;

			// Verificação de preenchimento dos campos obrigatórios
			if (!nome || !CEP || !email || !senha || !telefone) {
				return res.status(400).json({ status: "ERROR", message: "Todos os campos são obrigatórios!" });
			}

			// Verificação de email no padrão correto
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return res.status(400).json({ status: "ERROR", message: "Email inválido! O email deve estar no formato nome@dominio.com" });
			}

			// Verificação do CEP (Brasil: 8 dígitos, números apenas)
			const cepRegex = /^\d{5}-?\d{3}$/;
			if (!cepRegex.test(CEP)) {
				return res.status(400).json({ status: "ERROR", message: "CEP inválido! Deve conter 8 dígitos no formato XXXXX-XXX ou XXXXXXXX" });
			}

			// Verificação de telefone (Brasil: 10 ou 11 dígitos)
			const phoneRegex = /^\d{10,11}$/;
			if (!phoneRegex.test(telefone)) {
				return res.status(400).json({ status: "ERROR", message: "Telefone inválido! Deve conter 10 ou 11 dígitos." });
			}

			// Codificar a senha usando bcrypt
			const hashedPassword = await bcrypt.hash(senha, 12);
			req.body.senha = hashedPassword;

			// Criação do novo usuário
			const newUser = await Usuario.create(req.body);

			// Retornar o usuário criado com status OK
			res.json({ objAdded: newUser, status: "OK" });
		} catch (err) {
			res.status(500).json({ status: "ERROR", message: err.message });
			next();
		}
	});



router.route("/login")
	// Logar
	.post(async (req, res, next) => {

		const { email, senha } = req.body;

		try {

			if (!email || !senha) {
				return res.status(400).json({ error: 'Email ou senha vazios' });
			}

			console.log("Usuario " + email + "\nSenha: " + senha);

			const user = await Usuario.findOne({ email });
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}

			const pass_ok = await bcrypt.compare(senha, user.senha);
			if (!pass_ok) {
				return res.status(401).json({ error: 'Senha incorreta' });
			}

			const { _id } = user;
			const token = jwt.sign({ id: _id }, process.env.SESSION_SECRET, { expiresIn: '24h' });

			return res.status(200).json({//retorna o token que vai ser usado em situações restritas pro usuário
				token,
			});

		} catch (error) {
			return res.status(500).json({ error: 'Erro ao buscar usuário: ' + error.message });
		}
	});

router.route("/update")
	.patch((req, res, next) => {
		let userId = req.params.id;
		let userNewData = req.body;

		Usuario.findByIdAndUpdate(userId, userNewData, { new: true }). // {new: true} --> Retorna o elemento atualizado
			then((newUser) => {
				res.json(newUser);
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
				next();
			});
	});
// 	// Endpoint para carregar os dados do usuário por ID
// 	.get((req, res, next) => {
// 		let input_id = req.params.id;
// 		Usuario.findById(input_id)
// 			.then((UserData) => {
// 				res.json(UserData);
// 			})
// 			.catch((error) => {
// 				res.status(500).json({ message: error.message });
// 				next();
// 			});
// 	})

// Endpoint para atualizar um usuário por ID

router.route("/delete")
	// Endpoint para deletar um usuário por ID
	.delete((req, res, next) => {
		let userId = req.params.id;

		Usuario.findByIdAndDelete(userId).
			then((user) => {
				res.json(user);
			}).
			catch((error) => {
				res.status(500).json({ message: error.message });
			});
	});


module.exports = router;
