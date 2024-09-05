var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
var passport = require('passport')
var authenticate = require('./authenticate')  
var config = require('./config')


// Utilizando o banco de dados 
const mongoose = require("mongoose")

require('dotenv').config();

// Criando listeners para cada entidade em cada endpoint
var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var feedbackRouter = require('./routes/feedback.route');
var bikeRouter = require('./routes/bikes.route');



const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
	console.log("Banco de Dados conectado" );
}, (err) => {
	console.log(err);
});



const app = express();

app.use(cors({
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Middleware do Passport
app.use(passport.initialize());






// AS ROTAS VÊM POR ÚLTIMO SEMPRE
// Define os endpoints de cada "entidade"
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bike', bikeRouter);
app.use('/feedback', feedbackRouter);

module.exports = app;
