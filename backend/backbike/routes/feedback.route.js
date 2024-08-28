var express = require('express');
var router = express.Router();

var Feedback = require("../models/feedback.schema")

router.route("/")
	.get((req, res, next) => {
		Feedback.find()
			.then((data) => {
				res.json(data)
			})
			.catch((err) => {
				res.json({ message: err.message })
			});
	})
	// Add um novo feedback
	.post((req, res, next) => {
		// Funciona
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