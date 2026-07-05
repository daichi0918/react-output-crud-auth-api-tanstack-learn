import { useQuery } from '@tanstack/react-query';
import { checkAuthentication } from '../apis/auth';

export const useCheckAuthenticationQuery = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthentication,
    retry: false,
    staleTime: 1000 * 60 * 30, // 30分
  });
};
