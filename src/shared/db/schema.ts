import { integer, real, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

export const checkIns = sqliteTable('check_ins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  day: text('day').notNull().unique(),
  valence: integer('valence').notNull(),
  energy: real('energy').notNull(),
  note: text('note').notNull().default(''),
  createdAt: integer('created_at').notNull(),
});

export const habits = sqliteTable('habits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  createdAt: integer('created_at').notNull(),
});

export const habitLogs = sqliteTable(
  'habit_logs',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    habitId: integer('habit_id')
      .notNull()
      .references(() => habits.id, { onDelete: 'cascade' }),
    day: text('day').notNull(),
  },
  (table) => [unique().on(table.habitId, table.day)],
);
