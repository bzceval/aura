import { and, eq } from 'drizzle-orm';
import { db } from '@/shared/db/client';
import { habitLogs, habits } from '@/shared/db/schema';
import type { Habit } from '../types';
import { computeStreak } from '../lib/streak';

export const habitRepository = {
  async listWithStreaks(today: string): Promise<Habit[]> {
    const [habitRows, logRows] = await Promise.all([
      db.select().from(habits).orderBy(habits.createdAt),
      db.select().from(habitLogs),
    ]);

    const daysByHabit = new Map<number, string[]>();
    for (const log of logRows) {
      daysByHabit.set(log.habitId, [...(daysByHabit.get(log.habitId) ?? []), log.day]);
    }

    return habitRows.map((habit) => {
      const days = daysByHabit.get(habit.id) ?? [];
      return {
        id: habit.id,
        title: habit.title,
        doneToday: days.includes(today),
        streak: computeStreak(days, today),
      };
    });
  },

  async create(title: string): Promise<void> {
    await db.insert(habits).values({ title, createdAt: Date.now() });
  },

  async remove(id: number): Promise<void> {
    await db.delete(habits).where(eq(habits.id, id));
  },

  async setDone(habitId: number, day: string, done: boolean): Promise<void> {
    if (done) {
      await db.insert(habitLogs).values({ habitId, day }).onConflictDoNothing();
    } else {
      await db.delete(habitLogs).where(and(eq(habitLogs.habitId, habitId), eq(habitLogs.day, day)));
    }
  },
};
