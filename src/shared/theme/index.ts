export const colors = {
  bg: '#07070D',
  surface: '#12121C',
  surfaceRaised: '#1B1B29',
  border: '#262638',
  text: '#F4F4FA',
  textMuted: '#9A9AB5',
  accent: '#8B7CFF',
  success: '#5CE0B0',
  danger: '#FF6B8A',
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 } as const;

export const typography = {
  title: { fontSize: 28, fontWeight: '700', letterSpacing: -0.5 },
  heading: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '500', letterSpacing: 0.3 },
} as const;
