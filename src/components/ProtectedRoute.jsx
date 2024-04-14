import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signWithGoogle } from 'utils/auth';

function ProtectedRoute({ element }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isInitializing = useSelector((state) => state.auth.isInitializing);

  console.log(isAuthenticated, isInitializing);
  if (isInitializing) {
    return <div>Loading...</div>;
  }

  const handleSignIn = async () => {
    try {
      await signWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return isAuthenticated ? <>{element}</> : <Navigate to='/' replace />;
}

export default ProtectedRoute;
