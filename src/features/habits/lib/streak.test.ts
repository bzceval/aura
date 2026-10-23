import { computeStreak } from './streak';

describe('computeStreak', () => {
  it('is 0 with no logs', () => {
    expect(computeStreak([], '2026-10-06')).toBe(0);
  });

  it('counts consecutive days including today', () => {
    expect(computeStreak(['2026-10-06', '2026-10-05', '2026-10-04'], '2026-10-06')).toBe(3);
  });

  it('keeps the streak alive when only today is missing', () => {
    expect(computeStreak(['2026-10-05', '2026-10-04'], '2026-10-06')).toBe(2);
  });

  it('breaks on a gap', () => {
    expect(computeStreak(['2026-10-06', '2026-10-04'], '2026-10-06')).toBe(1);
  });

  it('is 0 when the last log is older than yesterday', () => {
    expect(computeStreak(['2026-10-03'], '2026-10-06')).toBe(0);
  });

  it('crosses month boundaries', () => {
    expect(computeStreak(['2026-10-01', '2026-09-30'], '2026-10-01')).toBe(2);
  });
});
