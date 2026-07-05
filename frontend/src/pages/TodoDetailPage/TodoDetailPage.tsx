import { useParams } from 'react-router';
import { useTodoQuery } from '../../features/todos/hooks';

export const TodoDetailPage = () => {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodoQuery(id || '');

  if (isLoading) return <p>読み込み中...</p>;
  if (!todo) return <p>見つかりませんでした</p>;

  return (
    <div>
      <h1>Todo Detail</h1>
      <p>Title: {todo.title}</p>
      <p>Content: {todo.content}</p>
    </div>
  );
};
