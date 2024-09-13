import { useDispatch } from 'react-redux';
import { handleLogin } from './authUtils';
import { Button } from '@/styles/GlobalStyles';

export const LoginButton = () => {
  const dispatch = useDispatch();

  const onHandleLogin = async () => {
    await handleLogin(dispatch);
  };

  return <Button onClick={onHandleLogin}>Login</Button>;
};
