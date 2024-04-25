import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { observeAuthState } from '@/store/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(observeAuthState());
  }, [dispatch]);

  return { user, isAuthenticated, isLoading, error };
};
export default useAuth;
