import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo } from '../apis/todo';
import { UpdateTodoRequest } from '../types';

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UpdateTodoRequest) => updateTodo(request),
    onSuccess: (data, variables) => {
      // setQueryData は、指定されたクエリキーに対してキャッシュされたデータを更新します。
      // ここでは、'todos'キーのデータを更新しています。
      // 具体的には、更新されたTodoのIDをキーとして使用し、そのTodoのデータを更新します。
      // これにより、Todoの更新が成功した後、クライアント側のキャッシュが最新の状態に保たれます。
      queryClient.setQueryData(['todos', variables.id], data);
      // invalidateQueries は、指定されたクエリキーに関連するすべてのクエリを無効化します。
      // ここでは、'todos'のクエリを無効化しています。
      // これにより、次回のクエリ実行時に最新のデータを取得するようになります。
      // これにより、更新されたTodoのデータが再度取得され、
      // クライアント側のキャッシュが最新の状態に保たれます
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
