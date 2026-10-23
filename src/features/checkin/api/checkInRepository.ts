import { desc, eq } from 'drizzle-orm';
import { db } from '@/shared/db/client';
import { checkIns } from '@/shared/db/schema';
import type { CheckIn, CheckInInput, Valence } from '../types';

function toCheckIn(row: typeof checkIns.$inferSelect): CheckIn {
  return { ...row, valence: row.valence as Valence };
}

export const checkInRepository = {
  async getByDay(day: string): Promise<CheckIn | null> {
    const [row] = await db.select().from(checkIns).where(eq(checkIns.day, day)).limit(1);
    return row ? toCheckIn(row) : null;
  },

  async list(limit: number): Promise<CheckIn[]> {
    const rows = await db.select().from(checkIns).orderBy(desc(checkIns.day)).limit(limit);
    return rows.map(toCheckIn);
  },

  async upsert(input: CheckInInput): Promise<void> {
    await db
      .insert(checkIns)
      .values({ ...input, createdAt: Date.now() })
      .onConflictDoUpdate({
        target: checkIns.day,
        set: { valence: input.valence, energy: input.energy, note: input.note },
      });
  },
};
