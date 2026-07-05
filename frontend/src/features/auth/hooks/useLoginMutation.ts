import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../apis/auth';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(['auth'], data);
    },
  });
};
