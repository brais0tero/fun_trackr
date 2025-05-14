import { create } from 'zustand';
import { Park } from '@/types/queue_times_types';

interface ParkStore {
  selectedPark: Park | null;
  setSelectedPark: (park: Park) => void;
}

export const useParkStore = create<ParkStore>((set) => ({
  selectedPark: null,
  setSelectedPark: (park) => set({ selectedPark: park }),
}));