// /client/src/hooks/useAuth.js
import { useAuth } from '../contexts/AuthContext';

const useAuthInfo = () => {
  const { user, login, logout } = useAuth();
  return { user, login, logout };
};

export default useAuthInfo;
