import { NavLink } from 'react-router';
import { useTodoListQuery, useDeleteTodoMutation } from '../../features/todos/hooks';
import { NAVIGATION_PATH } from '../../shared/constants/navigation';

export const TodoListPage = () => {
  const { data, isLoading } = useTodoListQuery();
  const deleteMutation = useDeleteTodoMutation();

  if (isLoading) return <p>読み込み中...</p>;

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`「${title}」のtodoを削除しますか？`)) {
      deleteMutation.mutate({ id });
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <NavLink to={NAVIGATION_PATH.CREATE}>+ Create</NavLink>
      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>
            <NavLink to={`${NAVIGATION_PATH.DETAIL}${todo.id}`}>
              {todo.title}
            </NavLink>
            {' | '}
            <NavLink to={`${NAVIGATION_PATH.EDIT}${todo.id}`}>edit</NavLink>
            {' | '}
            <button onClick={() => handleDelete(todo.id, todo.title)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
