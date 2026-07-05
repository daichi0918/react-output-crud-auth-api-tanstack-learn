import globalAxios from '../../../shared/apis/globalAxios';
import type { AuthType } from '../types';

export const checkAuthentication = async (): Promise<AuthType> => {
  const response = await globalAxios.post<AuthType>('/auth/authentication');
  return response.data;
};
