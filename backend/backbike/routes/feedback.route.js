var express = require('express');
var router = express.Router();

var Feedback = require("../models/feedback.schema")

router.route("/")
	.get((req, res, next) => {
		// TODO: Não consigo coletar um dado que está no bd. Sempre vem uma info vazia
		Feedback.find()
			.then((data) => {
				console.log("lalal")
				res.json({ "elementos": data })
			})
			.catch((err) => {
				res.json({ message: err.message })
			});
	})
	// Add um novo feedback
	.post((req, res, next) => {
		// Nem testei ainda
		const newFeedback = req.body;
		Feedback.create(newFeedback)
			.then((newFeed) => {
				res.json({ objAdded: newFeed, "status": "OK" });
			})
			.catch((err) => { 
				res.json({ objAdded: newFeed, "status": "ERROR", "message": err.message });
			});
	});

module.exports = router;