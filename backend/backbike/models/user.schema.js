const mongoose = require("mongoose");
// nomalize = require("normalize-mongoose");

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

// usersSchema.method("transform", function() {
// 	var obj = this.toObject();

// 	obj.id = obj._id;
// 	delete obj._id;

// 	return obj;
// })

// usersSchema.plugin(nomalize);

module.exports = mongoose.model('User', usersSchema);