const mongoose = require("mongoose");
// nomalize = require("normalize-mongoose");

var passportLocalMongoose = require('passport-local-mongoose')

var usersSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    CEP: {
        type: String,
        required: true
    },
    email: {
        type: String,
		required: true,
        unique: true // Geralmente, o e-mail deve ser único
    },
    
    telefone: {
        type: String,
        required: true
    },
    FavIds: [{
		type: mongoose.Types.ObjectId,
		ref: "Bike",
		default: []
    }],
});


usersSchema.plugin(passportLocalMongoose, { usernameField: 'email' });//Configura o campo usado como "nome de usuário" (no login) para ser o email em vez do padrão username

module.exports = mongoose.model('User', usersSchema);