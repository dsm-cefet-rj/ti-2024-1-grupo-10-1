var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Feedback = require("../models/feedback.schema");

// Rota para listar e adicionar feedbacks
router.route("/")
	.get(async (req, res, next) => {
		try {
			data = await Feedback.find().populate("userId", "nome").lean();// Popula os dados do usuário baseado no userId
			if (data !== null) {


				// Filtra os dados para enviar apenas o necessário
				const feedbacks = data.map((feedback) => {
					// Desestruturação para remover dados sensíveis do usuário (id)
					const { _id: id_feedback, __v: _v_feedback, userId: poster_data, ...resto_feedback } = feedback;

					const { nome: poster_name } = poster_data;

					return { feedbackId: id_feedback, posterName: poster_name, ...resto_feedback };

				});
				res.json({ feedbacks: feedbacks });
			}
		} catch (errorParam) {
			console.log(errorParam);
			res.status(500).json({ message: errorParam.message })
		}
	})

	.post(authenticate.verifyUser, async (req, res) => {
		console.log('Authenticated User:', req.user); // Adicione este log para verificar o conteúdo de req.user

		try {
			if (!req.user || !req.user._id) {
				return res.status(401).json({ status: 'ERROR', message: 'User not authenticated' });
			}

			const newFeedback = {
				userId: req.user._id,
				content: req.body.content,
				publication_date: new Date()
			};

			const feedback = await Feedback.create(newFeedback);
			if (feedback !== null) res.json({ objAdded: feedback, status: 'OK' });
		} catch (err) {
			res.status(500).json({ status: 'ERROR', message: err.message });
		}
	});



// Rota para atualizar e deletar feedbacks
router.route("/:id")
	// Atualizar um feedback existente
	.patch(authenticate.verifyUser, (req, res, next) => {
		const feedbackId = req.params.id;
		const updatedFeedback = req.body;

		Feedback.findByIdAndUpdate(feedbackId, updatedFeedback, { new: true })
			.then((updatedFeed) => {
				if (updatedFeed) {
					res.json({ objUpdated: updatedFeed, "status": "OK" });
				} else {
					res.status(404).json({ "status": "ERROR", "message": "Feedback não encontrado" });
				}
			})
			.catch((err) => {
				res.status(500).json({ "status": "ERROR", "message": err.message });
			});
	})

	// Deletar um feedback existente
	.delete(authenticate.verifyUser, (req, res, next) => {
		const feedbackId = req.params.id;

		Feedback.findByIdAndDelete(feedbackId)
			.then((deletedFeed) => {
				if (deletedFeed) {
					res.json({ objDeleted: deletedFeed, "status": "OK" });
				} else {
					res.status(404).json({ "status": "ERROR", "message": "Feedback não encontrado" });
				}
			})
			.catch((err) => {
				res.status(500).json({ "status": "ERROR", "message": err.message });
			});
	});

module.exports = router;
