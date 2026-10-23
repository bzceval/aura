import { getLocales } from 'expo-localization';
import { en, type TranslationKey } from './en';
import { tr } from './tr';

const dictionaries: Record<string, Record<TranslationKey, string>> = { en, tr };

const language = getLocales()[0]?.languageCode ?? 'en';
const dictionary = dictionaries[language] ?? en;

export function t(key: TranslationKey): string {
  return dictionary[key];
}

export type { TranslationKey };
