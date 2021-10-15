import { useAuth0 } from '@auth0/auth0-react';
import { Route } from 'react-router-dom';

function ProtectedRoute({ Component, isAuthenticated, ...restOfProps }) {
  const { loginWithRedirect } = useAuth0();
  return (
    <Route
      render={() =>
        isAuthenticated ? <Component {...restOfProps} /> : loginWithRedirect()
      }
      {...restOfProps}
    />
  );
}

export default ProtectedRoute;
