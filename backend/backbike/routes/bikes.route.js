var express = require('express');
var router = express.Router();

var Bike = require("../models/bike.schema");
const { Error } = require('mongoose');

router.route("/")
	// Coleta todos os produtos
	.get(async (req, res, next) => {
		try {

			data = await Bike.find({});


			// Gambiarra para transformar _id em bikeId... Ver como melhorar

			const modifiedBikes = data.map(bike => {
				return {
					bikeId: bike._id,
					userId: bike.userId,
					price: bike.price,
					description: bike.description,
					title: bike.title,
					favCounter: bike.favCounter,
					tipo: bike.tipo,
					imagem: bike.imagem,
				};
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
				res.json(bikeData)
			} else {
				let err = new Error("O produto de id " + req.params.id + " não foi encontrado");
				err.status(404);
				return next(err);
			}
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
