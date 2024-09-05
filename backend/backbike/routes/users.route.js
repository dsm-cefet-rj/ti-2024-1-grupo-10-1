var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var authenticate = require('../authenticate')
const passport = require('passport');
const User = require("../models/user.schema")

router.route("/")
	// Listagem de usuarios.
	.get((req, res, next) => {
		User.find({}).then((data) => {
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

			if (!nome || !CEP || !email || !senha || !telefone) {
				return res.status(400).json({ status: "ERROR", message: "Todos os campos são obrigatórios!" });
			}

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				return res.status(400).json({ status: "ERROR", message: "Email inválido!" });
			}

			const cepRegex = /^\d{5}-?\d{3}$/;
			if (!cepRegex.test(CEP)) {
				return res.status(400).json({ status: "ERROR", message: "CEP inválido!" });
			}

			const phoneRegex = /^\d{10,11}$/;
			if (!phoneRegex.test(telefone)) {
				return res.status(400).json({ status: "ERROR", message: "Telefone inválido!" });
			}
			
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ status: "ERROR", message: "O e-mail já está registrado." });
			}

			const newUser = new User({ nome, CEP, email, telefone });
			User.register(newUser, senha, (err, user) => {
				if (err) {
					return res.status(500).json({ status: "ERROR", message: err.message });
				}
				passport.authenticate('local')(req, res, () => {
					res.json({ status: "OK", message: "Usuário registrado e logado", user });
				});
			});
		} catch (err) {
			res.status(500).json({ status: "ERROR", message: err.message });
		}
	});




// Rota de login sem sessão
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
	const token = authenticate.getToken({ id: req.user._id });
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');//token no header
	res.json({ user: req.user._id, token: token, sucess: true});//isso vai pro frontend
});




router.route("/update")
	.patch((req, res, next) => {
		let userId = req.params.id;
		let userNewData = req.body;

		User.findByIdAndUpdate(userId, userNewData, { new: true }). // {new: true} --> Retorna o elemento atualizado
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
// 		User.findById(input_id)
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

		User.findByIdAndDelete(userId).
			then((user) => {
				res.json(user);
			}).
			catch((error) => {
				res.status(500).json({ message: error.message });
			});
	});


module.exports = router;
