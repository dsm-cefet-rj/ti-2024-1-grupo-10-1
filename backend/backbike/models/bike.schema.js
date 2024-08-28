const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
    bikeId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
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
        enum: ['MTB', 'Passeio', 'Speed', 'Electrica', 'Other'], // Enumeração para limitar os tipos permitidos, pode ser ajustado conforme necessário
        required: true
    },
    imagem: {
        type: String,
        required: true
    }
});

const Bike = mongoose.model('Bike', BikeSchema);

module.exports = Bike;
