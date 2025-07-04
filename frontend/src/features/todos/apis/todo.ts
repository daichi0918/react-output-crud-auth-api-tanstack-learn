import globalAxios from '../../../shared/apis/globalAxios';
import {
  TodoListType,
  TodoType,
  GetTodoRequest,
  CreateTodoRequest,
  UpdateTodoRequest,
  DeleteTodoRequest,
} from '../types';

export const getTodos = async (): Promise<TodoListType> => {
  const response = await globalAxios.get<TodoListType>('/todos');
  return response.data;
};

export const getTodo = async (request: GetTodoRequest): Promise<TodoType> => {
  const response = await globalAxios.get<TodoType>(`/todos/${request.id}`);
  return response.data;
};

export const createTodo = async (
  request: CreateTodoRequest
): Promise<TodoType> => {
  const response = await globalAxios.post<TodoType>('/todos', request);
  return response.data;
};

export const updateTodo = async (
  request: UpdateTodoRequest
): Promise<TodoType> => {
  const response = await globalAxios.put<TodoType>(`/todos/${request.id}`, {
    title: request.title,
    content: request.content,
  });
  return response.data;
};

export const deleteTodo = async (request: DeleteTodoRequest): Promise<void> => {
  await globalAxios.delete(`/todos/${request.id}`);
};
