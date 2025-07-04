import globalAxios from "../../../shared/apis/globalAxios";
import { AuthType } from "../types";

export const login = async (email: string, password: string): Promise<AuthType> => {
  const response = await globalAxios.post<AuthType>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthType> => {
  const response = await globalAxios.post<AuthType>("/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};

export const checkAuthentication = async (): Promise<AuthType> => {
  const response = await globalAxios.post<AuthType>("/auth/authentication");
  return response.data;
};
