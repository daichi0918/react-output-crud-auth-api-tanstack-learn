import globalAxios from '../../../shared/apis/globalAxios';
import type { AuthType } from '../types';

export const login = async (
  email: string,
  password: string
): Promise<AuthType> => {
  const response = await globalAxios.post<AuthType>('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const checkAuthentication = async (): Promise<AuthType> => {
  const response = await globalAxios.post<AuthType>('/auth/authentication');
  return response.data;
};
