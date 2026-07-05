import type { FC } from 'react';

import { useLoginTemplate } from './useLoginTemplate';

import styles from './style.module.css';

export const LoginTemplate: FC = () => {
  const { register, errors, handleLoginSubmit, isLoading } = useLoginTemplate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleLoginSubmit}>
        <div className={styles.area}>
          <input
            className={styles.input}
            type="email"
            placeholder="email"
            {...register('email')}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.area}>
          <input
            className={styles.input}
            type="password"
            placeholder="password"
            {...register('password')}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.area}>
          <button className={styles.button} type="submit" disabled={isLoading}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
