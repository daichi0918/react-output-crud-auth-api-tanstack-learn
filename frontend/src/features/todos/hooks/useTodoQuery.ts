import { useQuery } from '@tanstack/react-query';
import { getTodo } from '../apis/todo';

export const useTodoQuery = (id: string) => {
  return useQuery({
    queryKey: ['todos', id],
    queryFn: () => getTodo({ id }),
    enabled: !!id,
  });
};
