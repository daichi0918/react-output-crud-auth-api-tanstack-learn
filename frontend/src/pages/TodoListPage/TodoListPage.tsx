import { useTodoListQuery } from '../../features/todos/hooks';

export const TodoListPage = () => {
  const { data, isLoading } = useTodoListQuery();

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data?.todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
};
