import { useParams } from 'react-router';
import { PuffLoader } from 'react-spinners';
import { useTodoQuery } from '../../hooks';
import { TodoDetailView } from '../TodoDetailView';

export const TodoDetailTemplate = () => {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodoQuery(id || '');

  if (isLoading) {
    return <PuffLoader />;
  }

  return <>{!!todo && <TodoDetailView todo={todo} />}</>;
};
