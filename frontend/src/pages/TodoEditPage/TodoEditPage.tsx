import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router';

import { NAVIGATION_PATH } from '../../shared/constants/navigation';
import { useTodoQuery, useUpdateTodoMutation } from '../../features/todos/hooks';
import type { TodoType } from '../../features/todos/types';

const schema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です。')
    .max(10, '10文字以内で入力してください。'),
  content: z.string().optional(),
});

const TodoEditForm = ({ todo }: { todo: TodoType }) => {
  const navigate = useNavigate();
  const updateMutation = useUpdateTodoMutation();

  const {
    register,
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

  return (
    <form onSubmit={handleEditSubmit}>
      <div>
        <input type="text" placeholder="Title" {...register('title')} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <textarea placeholder="Content" {...register('content')} />
      </div>
      <button type="submit" disabled={updateMutation.isPending}>
        Edit Todo
      </button>
    </form>
  );
};

export const TodoEditPage = () => {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodoQuery(id || '');

  if (isLoading) return <p>読み込み中...</p>;
  if (!todo) return <p>見つかりませんでした</p>;

  return (
    <div>
      <h1>Todo Edit</h1>
      <TodoEditForm todo={todo} />
    </div>
  );
};
