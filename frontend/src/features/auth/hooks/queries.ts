import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, register, checkAuthentication } from "../apis/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], data);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export const useRegister = () => {
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

export const useCheckAuthentication = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthentication,
    retry: false,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};