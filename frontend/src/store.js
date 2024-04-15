import {create} from 'zustand';

const useBikeStore = create((set) => ({
    selectedBikeType: null,
    setSelectedBikeType: (bikeType) => set({ selectedBikeType: bikeType }),//tipo de bike (MTB, Speed, Passeio ou Elétrica)


    favoriteBikes: [], // Array para armazenar as bicicletas favoritas

    // Função para adicionar uma bicicleta aos favoritos
    addFavoriteBike: (bike) => {
        set((state) => ({
            favoriteBikes: [...state.favoriteBikes, bike],
        }));
    },

    // Função para remover uma bicicleta dos favoritos
    removeFavoriteBike: (bikeId) => {
        set((state) => ({
            favoriteBikes: state.favoriteBikes.filter((bike) => bike.id !== bikeId),
        }));
    },
}));

export default useBikeStore;




