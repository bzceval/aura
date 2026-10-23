import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toDay } from '@/shared/lib/date';
import { habitRepository } from '../api/habitRepository';

const HABITS_KEY = ['habits'] as const;

export function useHabits() {
  return useQuery({
    queryKey: HABITS_KEY,
    queryFn: () => habitRepository.listWithStreaks(toDay()),
  });
}

function useHabitMutation<TVariables>(mutationFn: (variables: TVariables) => Promise<void>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: HABITS_KEY }),
  });
}

export const useCreateHabit = () => useHabitMutation((title: string) => habitRepository.create(title));

export const useRemoveHabit = () => useHabitMutation((id: number) => habitRepository.remove(id));

export const useToggleHabit = () =>
  useHabitMutation(({ id, done }: { id: number; done: boolean }) =>
    habitRepository.setDone(id, toDay(), done),
  );
