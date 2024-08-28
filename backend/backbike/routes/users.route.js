var express = require('express');
var router = express.Router();

var Usuario = require("../models/user.schema")

router.route("/")
	/* GET users listing. */
	.get(function (req, res, next) {
		Usuario.find({}).then((data) => {
			res.json(data)
		}).catch((err) => {

		});
	})
	// Add user
	.post((req, res, next) => {
		const newUser = req.body;
		Usuario.create(newUser).then((newUser) => {
			res.json({ objAdded: newUser, "status": "OK" });
		}).catch((err) => {
			res.json({ objAdded: newUser, "status": "ERROR", "message": err.message });
		});
	});


router.route("/:id")
	.get((req, res, next) => {
		input_id = req.params.id
		res.json(users[input_id])
		// Usuario.findById(input_id).then((UserData) => {
		// 	res.json(UserData)
		// }).catch((error) => { res.status(500).json({ message: error.message }) })
	})





module.exports = router;
