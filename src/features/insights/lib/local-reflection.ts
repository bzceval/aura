import type { CheckIn } from '@/features/checkin/types';

export function summarizeLocally(checkIns: readonly CheckIn[]): string {
  const average = (values: number[]) => values.reduce((sum, v) => sum + v, 0) / values.length;
  const valence = average(checkIns.map((c) => c.valence));
  const energy = average(checkIns.map((c) => c.energy));
  const best = checkIns.reduce((a, b) => (b.valence > a.valence ? b : a));

  return [
    `Across ${checkIns.length} check-ins your mood averaged ${valence.toFixed(1)}/5 and energy ${Math.round(energy * 100)}%.`,
    `Your brightest day was ${best.day}.`,
    best.note ? `You wrote: “${best.note}”` : '',
  ]
    .filter(Boolean)
    .join(' ');
}
