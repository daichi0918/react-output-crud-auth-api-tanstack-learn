import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../apis/todo';

export const useTodoList = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};
