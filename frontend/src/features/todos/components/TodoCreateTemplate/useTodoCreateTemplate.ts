import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { NAVIGATION_PATH } from '../../../../shared/constants/navigation';

import { useCreateTodoMutation } from '../../hooks';

const schema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です。')
    .max(10, '10文字以内で入力してください。'),
  content: z.string().optional(),
});

export const useTodoCreateTemplate = () => {
  const navigate = useNavigate();
  const createMutation = useCreateTodoMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', content: '' },
  });

  const handleAddSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        try {
          await createMutation.mutateAsync({
            title: values.title,
            content: values.content,
          });
          navigate(NAVIGATION_PATH.TOP);
        } catch (error) {
          setError('title', {
            type: 'manual',
            message:
              (
                error as unknown as {
                  response?: { data?: { message?: string } };
                }
              ).response?.data?.message || '作成に失敗しました',
          });
        }
      },
      [navigate, createMutation, setError]
    )
  );

  return {
    control,
    errors,
    handleAddSubmit,
    isLoading: createMutation.isPending,
  };
};
