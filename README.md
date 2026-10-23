# Aura

Offline-first mood & habit journal. Every check-in becomes a one-of-a-kind **generative aura** rendered with a custom Skia shader, and Claude writes a weekly reflection from your entries.

## Highlights

- **GPU shader art** — SkSL fragment shader (domain-warped fBm noise) driven by mood (hue) and energy (speed, turbulence, saturation) via React Native Skia + Reanimated shared values.
- **Offline-first data** — `expo-sqlite` + Drizzle ORM, TanStack Query for caching/invalidation.
- **AI reflections** — Claude Messages API, bring-your-own-key stored in the device keychain (`expo-secure-store`); graceful offline fallback.
- **Gesture-driven UI** — custom Pan-gesture energy slider with haptic detents (Gesture Handler + worklets).
- **Feature-based architecture**, strict TypeScript, React Compiler, typed routes, TR/EN i18n.

## Stack

Expo SDK 57 · React Native 0.86 (New Architecture) · Expo Router · TypeScript (strict) · Skia · Reanimated 4 · Zustand · TanStack Query · Drizzle · Zod · Jest

## Structure

```
src/
  app/                 # Expo Router routes (thin re-exports)
  features/
    checkin/           # mood + energy capture, draft store
    aura/              # shader, palette, orb, journey gallery
    habits/            # habits, streak logic (unit-tested)
    insights/          # Claude client + offline fallback
    settings/          # API key storage
      └─ components/ hooks/ api/ types/ lib/
  shared/              # db, theme tokens, i18n, ui primitives
```

## Run

```bash
npm install
npx expo prebuild   # Skia & SQLite need a dev build, not Expo Go
npx expo run:ios    # or run:android
npm test && npm run typecheck && npm run lint
```
