import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React from 'react';
import Loader from 'react-loader-spinner';
import { Route } from 'react-router-dom';
import { LoadingSpinner } from 'styles';

function ProtectedRoute({ component, ...restOfProps }) {
  const { isLoading } = useAuth0();
  return (
    <Route
      component={withAuthenticationRequired(component, {
        onRedirecting: () =>
          isLoading && (
            <LoadingSpinner>
              <Loader type='ThreeDots' color='#32D3AC' />
            </LoadingSpinner>
          ),
      })}
      {...restOfProps}
    />
  );
}

export default ProtectedRoute;
