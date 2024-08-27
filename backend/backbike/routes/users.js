var express = require('express');
var router = express.Router();


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
router.get('/:id', function (req, res, next) {

	// res.statusCode = 200
	// res.setHeader("Content-Type", "aplication/json")
	res.json(users[req.params.id])
});

module.exports = router;
