import { NavLink } from 'react-router';
import { useTodoListQuery } from '../../features/todos/hooks';
import { NAVIGATION_PATH } from '../../shared/constants/navigation';

export const TodoListPage = () => {
  const { data, isLoading } = useTodoListQuery();

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>
            <NavLink to={`${NAVIGATION_PATH.DETAIL}${todo.id}`}>
              {todo.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
