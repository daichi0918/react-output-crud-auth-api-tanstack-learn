import { BrowserRouter } from 'react-router';
import { AuthRouter } from '../features/auth/routers/AuthRouter';
import { AuthProvider } from '../features/auth/contexts/AuthContext';

export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthRouter />
      </AuthProvider>
    </BrowserRouter>
  );
};
