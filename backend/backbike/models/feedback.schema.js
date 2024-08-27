const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: String, // Supondo que o Id_user seja um ObjectId referenciando um usuário
        ref: 'User', // Referência para a coleção de usuários (opcional)
        required: true
    },
    id_bike: {
        type: String, // Supondo que o Id_bike seja um ObjectId referenciando uma bicicleta
        ref: 'Bike', // Referência para a coleção de bicicletas (opcional)
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true // Remove espaços em branco no início e no final
    },
    publication_date: {
        type: String,
        // default: Date.now // Define a data de publicação como a data atual por padrão
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
