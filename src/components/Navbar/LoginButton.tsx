import { useDispatch } from 'react-redux';
import { Login } from './Navbar.styles';
import { handleLogin } from './authUtils';

export const LoginButton = () => {
  const dispatch = useDispatch();

  return <Login onClick={() => handleLogin(dispatch)}>Login</Login>;
};
