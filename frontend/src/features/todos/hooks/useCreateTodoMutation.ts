import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '../apis/todo';
import { CreateTodoRequest } from '../types';

export const useCreateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateTodoRequest) => createTodo(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
