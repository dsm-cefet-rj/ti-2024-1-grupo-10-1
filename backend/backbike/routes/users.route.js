var express = require('express');
var router = express.Router();

var Usuario = require("../models/user.schema")
let users = [
	{
		"id": "1",
		"nome": "Rodrigo Teixeira Parracho",
		"CEP": "12341234",
		"email": "parracho@gmail.com",
		"senha": "1234",
		"FavCollection": [
			1,
			3,
			2
		],
		"telefone": "21973641659"
	},
	{
		"id": "2",
		"nome": "Joao Jendiroba",
		"CEP": "12345678",
		"email": "jendiroba@gmail.com",
		"senha": "1234",
		"FavCollection": [],
		"telefone": "21973641659"
	},
	{
		"id": "3",
		"nome": "Gabriel Alves Giuliano",
		"CEP": "11111111",
		"email": "gabriel@gmail.com",
		"senha": "1234",
		"FavCollection": [],
		"telefone": "21973641659"
	}
]


/* GET users listing. */
router.get('/', function (req, res, next) {

	// res.statusCode = 200
	// res.setHeader("Content-Type", "aplication/json")
	res.json(users)
});

router.route("/:id").get((req, res, next) => {
	input_id = req.params.id
	res.json(users[input_id])
	// Usuario.findById(input_id).then((UserData) => {
	// 	res.json(UserData)
	// }).catch((error) => { res.status(500).json({ message: error.message }) })
});




module.exports = router;
