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

			if (newUser !== null) {

				User.register(newUser, senha, (err, user) => {
					if (err) {
						return res.status(500).json({ status: "ERROR", message: err.message });
					}
					passport.authenticate('local')(req, res, () => {

						res.json({ status: "OK", message: "Usuário registrado e logado", user });
					});
				});
			}
		} catch (err) {
			res.status(500).json({ status: "ERROR", message: err.message });
		}
	});

router.route("/:id")
	.get((req, res, next) => {
		User.findById(req.params.id).then((data) => {
			res.json(data);
		})
	}
	)// Endpoint para deletar um usuário por ID
	.delete((req, res, next) => {
		let userId = req.params.id;

		User.findByIdAndDelete(userId).
			then((user) => {
				res.json(user);
			}).
			catch((error) => {
				res.status(500).json({ message: error.message });
			});
	})
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



// Rota de login sem sessão
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {

	const token = authenticate.getToken({ id: req.user._id });
	const { _id: id, salt: salt, hash: hash, ...userData } = req.user.toObject();

	res.status(200);
	res.setHeader('Content-Type', 'application/json'); //Token no header
	res.json({ userId: id, ...userData, token: token, sucess: true });
});


router.route("/favorites/:id")
	.get(authenticate.verifyUser, async (req, res, next) => {
		// res.json({ data: req.user.FavIds });
		// Id vindo da req através do middleware que traduz o token em objeto
		let user = await User.findById(req.user._id).populate("FavIds", ["bikeId", "price", "description", "title", "imagem", "tipo"]);

		// res.json({ teste: user });
		if (user != null) {

			res.status(200);
			res.json({ status: "OK", favs: user.FavIds });
		} else {
			res.status(404);
			res.json({ message: "Usuário inexistente no banco de dados" });
		}

	});


//Rota pra pegar meus dados (usario logado)
router.route('/me/:id')
	.get(authenticate.verifyUser, async (req, res) => {
		try {
			const user = await User.findById(req.user._id, ["nome", "email", "FavIds"]); // req.user deve ser preenchido pela autenticação
			if (!user) return res.status(404).send('Usuário não encontrado');
			// Filtrar apenas os dados necessários
			res.json({ nome:user.nome, email:user.email, favs:user.FavIds });
		} catch (error) {
			res.status(500).send('Erro ao buscar informações do usuário');
		}
	});

module.exports = router;
