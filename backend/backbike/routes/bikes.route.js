var express = require('express');
var router = express.Router();

var Bike = require("../models/bike.schema");
const { Error } = require('mongoose');

router.route("/")
	// Coleta todos os produtos
	.get(async (req, res, next) => {
		try {

			allBikes = await Bike.find({}).lean();

			const modifiedBikes = allBikes.map(bike => {
				const { _id, bikeId, ...resto } = bike;
				return { bikeId: _id, ...resto };
			});

			res.json(modifiedBikes);

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
			res.status(400).json({ objAdded: newBike, "status": "ERROR", "message": err.message });
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
			if (bikeData != null) {

				//TODO: Lidar com _id...
				res.status(200)
				res.json(bikeData)
			} else {
				let err = {};
				res.status(404)
				// let err = new Error("O produto de id " + req.params.id + " não foi encontrado");
				res.json(err);

			}
		}
		catch (errorParam) {
			console.log(errorParam);

			res.status(500).json({ message: errorParam.message })
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
