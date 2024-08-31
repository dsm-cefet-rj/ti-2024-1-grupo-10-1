var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")


// Utilizando o banco de dados 
const mongoose = require("mongoose")

require('dotenv').config();

// Criando listeners para cada entidade em cada endpoint
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var feedbackRouter = require('./routes/feedback.route');
var bikeRouter = require('./routes/bikes.route');


const connect = mongoose.connect(process.env.MONGODB_URL + ":" + process.env.MONGODB_PORT + "/" + process.env.DATABASE_NAME);
connect.then((db) => {
	console.log("Banco de Dados (" + process.env.DATABASE_NAME + ") conectado a porta " + process.env.MONGODB_PORT);
}, (err) => {
	console.log(err);
});


var app = express();


app.use(cors({
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// AS ROTAS VÊM POR ÚLTIMO SEMPRE
// Define os endpoints de cada "entidade"
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bike', bikeRouter);
app.use('/feedback', feedbackRouter);

module.exports = app;
