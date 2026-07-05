import globalAxios from '../../../shared/apis/globalAxios';
import type { TodoListType, TodoType, GetTodoRequest } from '../types';

export const getTodos = async (): Promise<TodoListType> => {
  const response = await globalAxios.get<TodoListType>('/todos');
  return response.data;
};

export const getTodo = async (request: GetTodoRequest): Promise<TodoType> => {
  const response = await globalAxios.get<TodoType>(`/todos/${request.id}`);
  return response.data;
};
