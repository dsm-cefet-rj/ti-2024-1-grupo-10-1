const mongoose = require("mongoose")

var usersSchema = new mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.ObjectId,
    //     auto: true
    // },
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
        type: String,
        required: true
    },
});

module.exports = mongoose.model('User', usersSchema);