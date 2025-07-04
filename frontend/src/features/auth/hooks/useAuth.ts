import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import {
  NAVIGATION_PATH,
  NAVIGATION_LIST,
} from '../../../shared/constants/navigation';
import {
  setAxiosAuthentication,
  removeAxiosAuthentication,
} from '../../../shared/apis/globalAxios';
import { UserType } from '../../users/types';
import { useCheckAuthentication } from './';
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const { data: authData, isLoading } = useCheckAuthentication();

  const user = authData?.user || null;
  const isAuth = !!authData?.user;

  const signIn = useCallback(
    (user: UserType, token: string) => {
      setAxiosAuthentication(token);
      queryClient.setQueryData(['auth'], { user, token });
      navigate(NAVIGATION_PATH.TOP);
    },
    [navigate, queryClient]
  );

  const signOut = useCallback(() => {
    removeAxiosAuthentication();
    queryClient.setQueryData(['auth'], null);
    queryClient.invalidateQueries({ queryKey: ['auth'] });
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    navigate(NAVIGATION_PATH.LOGIN);
  }, [navigate, queryClient]);

  const isExitBeforeAuthPage = useCallback(
    () =>
      pathname === NAVIGATION_PATH.SIGNUP || pathname === NAVIGATION_PATH.LOGIN,
    [pathname]
  );

  useEffect(() => {
    if (isLoading) return;

    // 未ログインでログイン後のページにいる場合、ログイン画面にリダイレクト
    if (!isAuth && !isExitBeforeAuthPage()) navigate(NAVIGATION_LIST.LOGIN);
    // ログイン済で未ログインのページにいる場合、Todo一覧ページにリダイレクト
    if (isAuth && isExitBeforeAuthPage()) navigate(NAVIGATION_LIST.TOP);
  }, [isAuth, isExitBeforeAuthPage, navigate, isLoading]);

  return {
    user,
    isAuth,
    signIn,
    signOut,
    isLoading,
  };
};
