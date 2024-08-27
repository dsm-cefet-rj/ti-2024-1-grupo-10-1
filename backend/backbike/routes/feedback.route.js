var express = require('express');
var router = express.Router();

var Feedback = require("../models/feedback.schema")

let feedback = [
	{
		"userId": "1",
		"id_bike": "a184",
		"content": "Estou adorando a experiência no BikeSellers! É incrível poder encontrar uma variedade tão grande de bicicletas para todos os gostos e necessidades. Além disso, a possibilidade de marcar encontros diretamente com os vendedores facilita muito o processo de compra. Recomendo totalmente!.",
		"publication_date": "2024-01-01"
	}
]


// router.get("/", (req, res, next) => {
// 	Feedbacks.find()
// 		.then((data) => {
// 			res.json({ "elementos": data })
// 		})
// 		.catch((err) => {
// 			res.json({ message: err.message })
// 		})
// });
router.route("/")
	.get( async (req, res, next) => {

		try {

			const data = await Feedback.find({});
			res.json({ "elementos": data });

		}
		catch (error) {
			next(error);
		}
	});



module.exports = router;