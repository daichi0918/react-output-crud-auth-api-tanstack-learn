import { useParams } from 'react-router';
import { useTodo } from '../../hooks';

export const useTodoDetailTemplate = () => {
  const { id } = useParams();
  const { data: todo, isLoading } = useTodo(id || '');

  return { todo, isLoading };
};
