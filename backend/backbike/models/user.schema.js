const mongoose = require("mongoose")

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
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    FavIds: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
});

module.exports = mongoose.model('User', usersSchema);