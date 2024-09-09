var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate');
var Bike = require("../models/bike.schema");
const { ObjectId } = require('mongodb');


router.route("/")
	// Coleta todos os produtos
	.get(async (req, res, next) => {
		try {

			allBikes = await Bike.find({}).lean();

			// Foda-se vai na gambiarra mermo
			const modifiedBikes = allBikes.map(bike => {
				const { _id, bikeId, __v, ...resto } = bike;
				return { bikeId: _id, ...resto };
			});

			// res.json(allBikes);
			res.json(modifiedBikes);

		} catch (error) {
			next();
		}
	})

	// Adiciona um produto
	.post(authenticate.verifyUser, async (req, res, next) => {
		try {
			const { title, description, price, tipo, imagem } = req.body;

			// Verifica se todos os campos necessários estão presentes
			if (!title || !description || !price || !tipo || !imagem) {
				return res.status(400).json({ status: 'ERROR', message: 'Campos incompletos.' });
			}

			// Cria um novo objeto Bike com o userId
			const newBike = {
				title,
				description,
				price,
				tipo,
				imagem,
				userId: req.user._id // Obtém o ID do usuário do objeto req
			};

			// Cria a bicicleta no banco de dados
			const bike = await Bike.create(newBike);
			res.status(201).json({ status: 'OK', objAdded: bike });
		} catch (err) {
			res.status(400).json({ status: 'ERROR', message: err.message });
			next();
		}
	});



router.route('/:id')
	// Retorna um produto específico
	// Por enquanto não avalia se o usuário está logado ou não - Caso esteja, retor 
	.get(async function (req, res, next) {
		try {
			// Precisa ser via params, do contrário a requisição será interpretada como get geral 
			let bikeId = req.params.id

			let bikeData = await Bike.findById(bikeId).populate("userId").lean();

			if (bikeData != null) {

				// Filtrando apenas o que desejo exibir da bicicleta (resto_bike) através da desestruturação do objeto
				const { _id: id_bike, bikeId, __v: _v_bike, userId: critical_sellerData, ...resto_bike } = bikeData;

				// Filtrando apenas o que desejo exibir do vendedor da bike (resto vendedor) através da desestruturação do objeto
				const { _id: id_vend, __v: _v_vend, CEP: cep_vend, FavIds: fav_bikes_vend, ...resto_vendedor } = critical_sellerData;

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
		//TODO: Checar se as entradas estão vazias
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


router.route('/me')
	// Rota para obter bicicletas postadas pelo usuário logado
	.get(authenticate.verifyUser, async (req, res, next) => {
		try {
			const userId = req.user._id;
			const bikes = await Bike.find({ userId }).lean();

			// Modifica o formato dos dados conforme necessário
			const modifiedBikes = bikes.map(bike => {
				const { _id, bikeId, __v, ...resto } = bike;
				return { bikeId: _id, ...resto };
			});

			res.status(200).json(modifiedBikes);
		} catch (err) {
			res.status(500).json({ status: 'ERROR', message: err.message });
			next();
		}
	});


router.route('/productsFrom/:id')
	.get(authenticate.verifyUser, async (req, res, next) => {
		try {
			const id = req.user._id;
			if (id !== null) {

				user_products = await Bike.find({ userId: id }, ["_id", "description", "price", "title", "imagem",]).lean();

				if (user_products !== null) {
					// Renomeia cada atributo _id
					renamed_user_products = user_products.map((bike) => { return { bikeId: bike._id, ...bike }; })
					res.json(renamed_user_products);
				}
			}

			// const user = await User.find(req.user._id); // req.user deve ser preenchido pela autenticação
			// if (!user) return res.status(404).send('Usuário não encontrado');
			// res.json(user);
		} catch (error) {
			res.status(500).send('Erro ao buscar informações' + error.message);
		}
	});
module.exports = router;
