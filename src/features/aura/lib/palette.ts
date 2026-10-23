import type { AuraPalette, Rgb } from '../types';

const MIN_VALENCE = 1;
const MAX_VALENCE = 5;
// indigo -> teal -> green -> amber -> hot pink (-30 wraps to 330)
const HUE_ANCHORS = [250, 190, 140, 40, -30] as const;

function hueAt(t: number): number {
  'worklet';
  const scaled = t * (HUE_ANCHORS.length - 1);
  const index = Math.min(Math.floor(scaled), HUE_ANCHORS.length - 2);
  const from = HUE_ANCHORS[index] ?? 0;
  const to = HUE_ANCHORS[index + 1] ?? 0;
  const hue = from + (to - from) * (scaled - index);
  return (hue + 360) % 360;
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  'worklet';
  const a = s * Math.min(l, 1 - l);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [channel(0), channel(8), channel(4)];
}

/**
 * Valence drives hue, energy drives saturation and lightness.
 */
export function auraPalette(valence: number, energy: number): AuraPalette {
  'worklet';
  const t = Math.min(Math.max((valence - MIN_VALENCE) / (MAX_VALENCE - MIN_VALENCE), 0), 1);
  const hue = hueAt(t);
  const saturation = 0.55 + energy * 0.4;
  const lightness = 0.42 + energy * 0.14;
  return {
    primary: hslToRgb(hue, saturation, lightness),
    secondary: hslToRgb((hue + 55) % 360, saturation, Math.min(lightness + 0.14, 0.75)),
  };
}
