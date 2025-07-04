import { PuffLoader } from 'react-spinners';
import { useParams } from 'react-router';

import { useTodo } from '../../hooks';

import { TodoEditForm } from '../TodoEditForm';

export const TodoEditTemplate = () => {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodo(id || '');

  if (isLoading) {
    return <PuffLoader />;
  }

  return <>{todo && <TodoEditForm todo={todo} />}</>;
};
