const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId, // Supondo que o Id_user seja um ObjectId referenciando um usuário
        ref: 'User', // Referência para a coleção de usuários (opcional)
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true // Remove espaços em branco no início e no final
    },
    publication_date: {
        type: Date,
        default: Date.now // Define a data de publicação como a data atual por padrão
    }
});

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
