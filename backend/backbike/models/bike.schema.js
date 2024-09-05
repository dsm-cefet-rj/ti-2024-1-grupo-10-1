const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
    bikeId: {
        type: mongoose.Types.ObjectId,
    },
    userId: {
        type: mongoose.Types.ObjectId,
		ref: "User",
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    favCounter: {
        type: Number,
        default: 0 // Valor padrão caso não seja fornecido
    },
    tipo: {
        type: String,
        enum: ['MTB', 'Passeio', 'Speed', 'Eletrica', 'Other'], // Enumeração para limitar os tipos permitidos, pode ser ajustado conforme necessário
        required: true
    },
    imagem: {
        type: String,
        required: true
    }
});

const Bike = mongoose.model('Bike', BikeSchema);

module.exports = Bike;
