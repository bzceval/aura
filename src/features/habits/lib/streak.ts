import { addDays, format, parseISO } from 'date-fns';

const DAY_FORMAT = 'yyyy-MM-dd';

/**
 * Consecutive completed days ending today. If today isn't done yet the streak
 * is still alive as long as yesterday was completed.
 */
export function computeStreak(completedDays: readonly string[], today: string): number {
  const done = new Set(completedDays);
  const yesterday = format(addDays(parseISO(today), -1), DAY_FORMAT);

  let cursor = done.has(today) ? today : yesterday;
  let streak = 0;
  while (done.has(cursor)) {
    streak += 1;
    cursor = format(addDays(parseISO(cursor), -1), DAY_FORMAT);
  }
  return streak;
}
