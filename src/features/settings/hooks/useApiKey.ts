import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiKeyStorage } from '../api/apiKeyStorage';

export const API_KEY_QUERY = ['settings', 'api-key'] as const;

export function useApiKey() {
  return useQuery({ queryKey: API_KEY_QUERY, queryFn: apiKeyStorage.get });
}

export function useSaveApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: string) => (value ? apiKeyStorage.set(value) : apiKeyStorage.clear()),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: API_KEY_QUERY }),
  });
}
