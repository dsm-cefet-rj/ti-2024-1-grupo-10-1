var express = require('express');
var router = express.Router();

var Bike = require("../models/bike.schema");

router.route("/")
	// Coleta todos os produtos
	.get(async (req, res, next) => {
		try {

			data = await Bike.find({});
			res.json(data);

		} catch (error) {
			next();
		}
	})

	// Adiciona um produto
	.post((req, res, next) => {
		let newBike = req.body;
		Bike.create(newBike).then((newBike) => {
			res.json({ objAdded: newBike, "status": "OK" });
		}).catch((err) => {
			res.json({ objAdded: newBike, "status": "ERROR", "message": err.message });
			next();
		});
	});



router.route('/:id')
	// Retorna um produto específico
	.get(async function (req, res, next) {
		try {
			// Precisa ser via params, do contrário a requisição será interpretada como get geral 
			let bikeId = req.params.id

			let bikeData = await Bike.findById(bikeId);

			// Lidar com _id...
			res.json(bikeData)
		}
		catch (error) {
			res.status(500).json({ message: error.message })
		}
	})
	// Atualiza um ou vários campos de um elemento
	.patch(function (req, res, next) {
		let bikeId = req.params.id
		let bikeNewData = req.body

		Bike.findByIdAndUpdate(bikeId, bikeNewData, { new: true }). // {new: true} --> Retorna o elemento atualizado
			then((produto) => {
				res.json(produto)
			}).
			catch((error) => {
				res.status(500).json({ message: error.message });
				next();
			});
	})
	// DELETE /produtos/:id
	// Remove um produto específico
	.delete(function (req, res, next) {
		let bikeId = req.params.id;

		Bike.findByIdAndDelete(bikeId).
			then((bike) => {
				res.json(bike)
			}).
			catch((error) => {
				res.status(500).json({ message: error.message })
			})
	});

module.exports = router;
