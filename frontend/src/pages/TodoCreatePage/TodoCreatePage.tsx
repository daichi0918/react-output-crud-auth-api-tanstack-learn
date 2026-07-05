import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';

import { NAVIGATION_PATH } from '../../shared/constants/navigation';
import { useCreateTodoMutation } from '../../features/todos/hooks';

const schema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です。')
    .max(10, '10文字以内で入力してください。'),
  content: z.string().optional(),
});

export const TodoCreatePage = () => {
  const navigate = useNavigate();
  const createMutation = useCreateTodoMutation();

  const {
    register,
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

  return (
    <div>
      <h1>Todo Create</h1>
      <form onSubmit={handleAddSubmit}>
        <div>
          <input type="text" placeholder="Title" {...register('title')} />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <textarea placeholder="Content" {...register('content')} />
        </div>
        <button type="submit" disabled={createMutation.isPending}>
          Create
        </button>
      </form>
    </div>
  );
};
