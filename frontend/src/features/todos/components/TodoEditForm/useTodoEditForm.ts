import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUpdateTodoMutation } from '../../hooks';
import { NAVIGATION_PATH } from '../../../../shared/constants/navigation';

import { TodoType } from '../../types';

const schema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です。')
    .max(10, '10文字以内で入力してください。'),
  content: z.string().optional(),
});

type UseTodoEditFormParam = {
  todo: TodoType;
};

export const useTodoEditForm = ({ todo }: UseTodoEditFormParam) => {
  const navigate = useNavigate();

  const updateMutation = useUpdateTodoMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: todo.title, content: todo.content },
  });

  const handleEditSubmit = handleSubmit(
    useCallback(
      async (values: z.infer<typeof schema>) => {
        try {
          await updateMutation.mutateAsync({
            id: todo.id,
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
              ).response?.data?.message || '更新に失敗しました',
          });
        }
      },
      [navigate, todo, updateMutation, setError]
    )
  );

  return {
    control,
    errors,
    handleEditSubmit,
    isSaving: updateMutation.isPending,
  };
};
