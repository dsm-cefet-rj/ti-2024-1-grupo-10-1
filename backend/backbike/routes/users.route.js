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
	// .post(async (req, res, next) => {
	// 	try {
	// 		const { senha } = req.body;
	// 		// Alguma análise/filtro antes de add ao bd?

	// 		// TODO: Criar testes de checagem

	// 		// Codificar a senha usando bcrypt
	// 		new_user.senha = await bcrypt.hash(senha, 12);

	// 		data_new_user = await Usuario.create(newUser);

	// 		res.json({ objAdded: data_new_user, "status": "OK" });

	// 	}
	// 	catch (err) {
	// 		res.json({ objAdded: newUser, "status": "ERROR", "message": err.message });
	// 		next();
	// 	}
	// });


router.route("/login")
	// Logar
	.post(async (req, res, next) => {

		const { username, passwd } = req.body;

		try {

			if (!username || !passwd) {
				return res.status(400).json({ error: 'Email ou senha vazios' });
			}
			console.log("Usuario " + username + "\nSenha: " + passwd);
			const user = await Usuario.findOne({ email: username });
			if (!user) {
				return res.status(404).json({ error: 'Usuário não encontrado' });
			}

			const pass_ok = await bcrypt.compare(passwd, user.senha);
			if (!pass_ok) {
				return res.status(401).json({ error: 'Senha incorreta' });
			}

			const { _id } = user;
			const token = jwt.sign({ id: _id }, process.env.SESSION_SECRET, { expiresIn: '24h' });

			return res.status(200).json({
				token: token,
				usuario: {
					userId: _id,
					nome: user.nome,
					email: user.email,
					tel: user.telefone,
					cep: user.CEP,
					favBikes: user.FavIds
				}
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
