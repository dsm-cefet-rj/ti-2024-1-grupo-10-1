var express = require('express');
var router = express.Router();

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
	.post((req, res, next) => {
		const newUser = req.body;
		// Alguma análise/filtro antes de add ao bd?

		Usuario.create(newUser).then((newUser) => {
			res.json({ objAdded: newUser, "status": "OK" });
		}).catch((err) => {
			res.json({ objAdded: newUser, "status": "ERROR", "message": err.message });
			next();
		});
	});

router.route("/:id")
	// Endpoint para carregar os dados do usuário por ID
	.get((req, res, next) => {
		let input_id = req.params.id;
		Usuario.findById(input_id)
			.then((UserData) => {
				res.json(UserData);
			})
			.catch((error) => {
				res.status(500).json({ message: error.message });
				next();
			});
	})

	// Endpoint para atualizar um usuário por ID
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
	})

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
