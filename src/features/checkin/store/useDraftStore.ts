import { create } from 'zustand';
import { Valence } from '../types';

interface DraftState {
  valence: Valence;
  energy: number;
  note: string;
  setValence: (valence: Valence) => void;
  setEnergy: (energy: number) => void;
  setNote: (note: string) => void;
  hydrate: (draft: Pick<DraftState, 'valence' | 'energy' | 'note'>) => void;
}

export const useDraftStore = create<DraftState>((set) => ({
  valence: Valence.Okay,
  energy: 0.5,
  note: '',
  setValence: (valence) => set({ valence }),
  setEnergy: (energy) => set({ energy }),
  setNote: (note) => set({ note }),
  hydrate: ({ valence, energy, note }) => set({ valence, energy, note }),
}));
