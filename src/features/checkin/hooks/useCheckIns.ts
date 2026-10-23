import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { checkInRepository } from '../api/checkInRepository';
import type { CheckInInput } from '../types';

export const checkInKeys = {
  all: ['check-ins'] as const,
  day: (day: string) => ['check-ins', 'day', day] as const,
  list: (limit: number) => ['check-ins', 'list', limit] as const,
};

export function useCheckInForDay(day: string) {
  return useQuery({
    queryKey: checkInKeys.day(day),
    queryFn: () => checkInRepository.getByDay(day),
  });
}

export function useCheckInList(limit = 90) {
  return useQuery({
    queryKey: checkInKeys.list(limit),
    queryFn: () => checkInRepository.list(limit),
  });
}

export function useSaveCheckIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CheckInInput) => checkInRepository.upsert(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: checkInKeys.all }),
  });
}
