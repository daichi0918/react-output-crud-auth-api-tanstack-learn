import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  register } from "../apis/auth";



export const useSignup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      register(name, email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};