const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite'); // Modelo de Favoritos
const User = require('../models/User'); // Modelo de Usuário

// Rota para pegar as bikes favoritas de um usuário
router.get('/favorites/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Verifique se o usuário existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Busque as bikes favoritadas desse usuário
        const favorites = await Favorite.find({ userId: userId }).populate('bikeId');

        // Retorne os favoritos
        res.status(200).json({
            status: 'OK',
            favs: favorites.map(favorite => ({
                _id: favorite.bikeId._id,
                titulo: favorite.bikeId.titulo,
                tipo: favorite.bikeId.tipo,
                price: favorite.bikeId.price,
                imagem: favorite.bikeId.imagem
            }))
        });
    } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;
