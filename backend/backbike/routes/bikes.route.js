var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Bike = require("../models/bike.schema");

router.route("/")
	// Coleta todos os produtos
	.get(async(req, res, next) => {
		try {

			allBikes = await Bike.find({}).lean();

			const modifiedBikes = allBikes.map(bike => {
				const { _id, bikeId, __v, ...resto } = bike;
				return { bikeId: _id, ...resto };
			});

			res.json(modifiedBikes);

		} catch (error) {
			next();
		}
	})

	// Adiciona um produto
	.post(authenticate.verifyUser, (req, res, next) => {//verifica se esta logado
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
	.get(authenticate.verifyUser,async function (req, res, next) {
		try {
			// Precisa ser via params, do contrário a requisição será interpretada como get geral 
			let bikeId = req.params.id

			let bikeData = await Bike.findById(bikeId).populate("userId").lean();

			if (bikeData != null) {

				// Filtrando apenas o que desejo exibir da bicicleta (resto_bike) através da desestruturação do objeto
				const { _id: id_bike, bikeId, __v: _v_bike, userId: critical_sellerData, ...resto_bike } = bikeData;
				
				// Filtrando apenas o que desejo exibir do vendedor da bike (resto vendedor) através da desestruturação do objeto
				const { _id: id_vend, __v: _v_vend, CEP:cep_vend, senha:pass_vend, FavIds:fav_bikes_vend, ...resto_vendedor } = critical_sellerData;
				
				res.status(200);
				// Exibo o id da bike, os dados do vendedor e os dados da bicicleta
				res.json({ sellerData: resto_vendedor, ...resto_bike });

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
