import {create} from 'zustand';

const useBikeStore = create((set) => ({
    selectedBikeType: null,
    setSelectedBikeType: (bikeType) => set({ selectedBikeType: bikeType }),//tipo de bike (MTB, Speed, Passeio ou Elétrica)
    
}));

export default useBikeStore;




