var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Criando listeners para cada entidade em cada endpoint
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var feedbackRouter = require('./routes/feedback.route');




// Utilizando o banco de dados 
const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/bikeseller"

const connect = mongoose.connect(url);

connect.then((db) => {
	console.log("Banco de Dados conectado !!")
}, (err) => { console.log(err); });




var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Define os endpoints de cada "entidade"
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/feedback', feedbackRouter);

module.exports = app;
