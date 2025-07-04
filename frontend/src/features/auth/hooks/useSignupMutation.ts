import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../apis/auth';

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => register(name, email, password),
    onSuccess: (data) => {
      // setQueryData は、指定されたクエリキーに対してキャッシュされたデータを更新します。
      queryClient.setQueryData(['auth'], data);
      // invalidateQueries は、指定されたクエリキーに関連するすべてのクエリを無効化します。
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
};
