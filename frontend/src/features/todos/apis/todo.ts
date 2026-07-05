import globalAxios from '../../../shared/apis/globalAxios';
import type { TodoListType } from '../types';

export const getTodos = async (): Promise<TodoListType> => {
  const response = await globalAxios.get<TodoListType>('/todos');
  return response.data;
};
