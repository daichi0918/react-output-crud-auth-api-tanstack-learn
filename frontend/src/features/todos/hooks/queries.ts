import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from "../apis/todo";
import {  
  CreateTodoRequest, 
  UpdateTodoRequest, 
  DeleteTodoRequest,
} from "../types";

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

export const useTodo = (id: string) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => getTodo({ id }),
    enabled: !!id,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: CreateTodoRequest) => createTodo(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: UpdateTodoRequest) => updateTodo(request),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todos", variables.id], data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: DeleteTodoRequest) => deleteTodo(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.removeQueries({ queryKey: ["todos", variables.id] });
    },
  });
};