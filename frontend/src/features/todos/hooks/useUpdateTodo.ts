import { useMutation,  useQueryClient } from "@tanstack/react-query";
import {  updateTodo, } from "../apis/todo";
import {  
  UpdateTodoRequest, 
} from "../types";


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