var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Feedback = require("../models/feedback.schema");

// Rota para listar e adicionar feedbacks
router.route("/")
	.get((req, res, next) => {
		Feedback.find()
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json({ message: err.message });
			});
	})

	.post(authenticate.verifyUser, (req, res, next) => {
		const newFeedback = req.body;
		Feedback.create(newFeedback)
			.then((newFeed) => {
				res.json({ objAdded: newFeed, "status": "OK" });
			})
			.catch((err) => { 
				res.json({ "status": "ERROR", "message": err.message });
			});
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
