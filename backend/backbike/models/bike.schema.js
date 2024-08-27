const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
    id_bike: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    titulo: {
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
    },
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true // Definindo como único para garantir que não haja duplicatas
    // }
});

const Bike = mongoose.model('Bike', BikeSchema);

module.exports = Bike;
