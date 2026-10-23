import { useMutation } from '@tanstack/react-query';
import { checkInRepository } from '@/features/checkin/api/checkInRepository';
import { apiKeyStorage } from '@/features/settings/api/apiKeyStorage';
import { reflectWithClaude } from '../api/claudeClient';
import { summarizeLocally } from '../lib/localReflection';
import { ReflectionSource, type Reflection } from '../types';

const WEEK = 7;
const MIN_CHECK_INS = 2;

async function generateReflection(): Promise<Reflection | null> {
  const checkIns = await checkInRepository.list(WEEK);
  if (checkIns.length < MIN_CHECK_INS) return null;

  const apiKey = await apiKeyStorage.get();
  if (!apiKey) {
    return { text: summarizeLocally(checkIns), source: ReflectionSource.Local };
  }

  const text = await reflectWithClaude(apiKey, checkIns);
  return { text, source: ReflectionSource.Claude };
}

export function useReflection() {
  return useMutation({ mutationFn: generateReflection });
}
