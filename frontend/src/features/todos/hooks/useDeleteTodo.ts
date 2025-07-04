import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTodo } from '../apis/todo';
import { DeleteTodoRequest } from '../types';

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: DeleteTodoRequest) => deleteTodo(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.removeQueries({ queryKey: ['todos', variables.id] });
    },
  });
};
