import { format, subDays } from 'date-fns';

const DAY_FORMAT = 'yyyy-MM-dd';

export function toDay(date: Date = new Date()): string {
  return format(date, DAY_FORMAT);
}

export function daysAgo(count: number, from: Date = new Date()): string {
  return toDay(subDays(from, count));
}
