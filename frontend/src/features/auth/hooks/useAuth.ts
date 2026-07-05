import { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import {
  NAVIGATION_PATH,
  NAVIGATION_LIST,
} from '../../../shared/constants/navigation';
import {
  setAxiosAuthentication,
  removeAxiosAuthentication,
} from '../../../shared/apis/globalAxios';
import type { UserType } from '../../users/types';
import { useCheckAuthenticationQuery } from './useCheckAuthenticationQuery';

export const useAuth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const { data: authData, isLoading } = useCheckAuthenticationQuery();

  const user = authData?.user || null;
  const isAuth = !!authData?.user;

  const signIn = useCallback(
    (user: UserType, token: string) => {
      setAxiosAuthentication(token);
      // クエリクライアントを使用して、'auth'キーのデータを直接更新する
      queryClient.setQueryData(['auth'], { user, token });
      navigate(NAVIGATION_PATH.TOP);
    },
    [navigate, queryClient],
  );

  const signOut = useCallback(() => {
    removeAxiosAuthentication();
    queryClient.setQueryData(['auth'], null);
    queryClient.invalidateQueries({ queryKey: ['auth'] });
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    navigate(NAVIGATION_PATH.LOGIN);
  }, [navigate, queryClient]);

  const isExitBeforeAuthPage = useMemo(
    () =>
      pathname === NAVIGATION_PATH.SIGNUP || pathname === NAVIGATION_PATH.LOGIN,
    [pathname],
  );

  useEffect(() => {
    if (isLoading) return;

    // 未ログインでログイン後のページにいる場合、ログイン画面にリダイレクト
    if (!isAuth && !isExitBeforeAuthPage) navigate(NAVIGATION_LIST.LOGIN);
    // ログイン済で未ログインのページにいる場合、Todo一覧ページにリダイレクト
    if (isAuth && isExitBeforeAuthPage) navigate(NAVIGATION_LIST.TOP);
  }, [isAuth, isExitBeforeAuthPage, navigate, isLoading]);

  return {
    user,
    isAuth,
    signIn,
    signOut,
    isLoading,
  };
};
