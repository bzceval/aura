export enum Valence {
  Drained = 1,
  Low = 2,
  Okay = 3,
  Good = 4,
  Radiant = 5,
}

export const VALENCE_EMOJI: Record<Valence, string> = {
  [Valence.Drained]: '😮‍💨',
  [Valence.Low]: '😕',
  [Valence.Okay]: '😐',
  [Valence.Good]: '🙂',
  [Valence.Radiant]: '🤩',
};

export interface CheckIn {
  id: number;
  day: string;
  valence: Valence;
  energy: number;
  note: string;
  createdAt: number;
}

export interface CheckInInput {
  day: string;
  valence: Valence;
  energy: number;
  note: string;
}
