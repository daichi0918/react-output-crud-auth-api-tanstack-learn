import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuthContext } from '../../../auth/hooks/useAuthContext';
import { useSignup } from '../../hooks';

const schema = z.object({
  name: z.string().min(1, '1文字以上で入力してください'),
  email: z.string().email('メールアドレスの形式で入力してください'),
  password: z.string().min(8, '8文字以上で入力してください'),
  password_confirmation: z.string().min(8, '8文字以上で入力してください'),
});

export const useSignUpTemplate = () => {
  const { signIn } = useAuthContext();
  const registerMutation = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const handleRegisterSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        if (values.password !== values.password_confirmation) {
          setError('password', {
            type: 'manual',
            message: '確認用パスワードと一致しません',
          });
          return;
        }
        const { name, email, password } = values;
        try {
          const data = await registerMutation.mutateAsync({
            name,
            email,
            password,
          });
          signIn(data.user, data.token);
        } catch (error) {
          setError('name', {
            type: 'manual',
            message:
              (
                error as unknown as {
                  response?: { data?: { message?: string } };
                }
              ).response?.data?.message || '登録に失敗しました',
          });
        }
      },
      [signIn, setError, registerMutation]
    )
  );

  return {
    control,
    errors,
    handleRegisterSubmit,
    isLoading: registerMutation.isPending,
  };
};
