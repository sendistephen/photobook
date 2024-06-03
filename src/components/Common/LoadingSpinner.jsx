import React from 'react';

import LoaderComponent from '@/components/LoaderComponent';
import { LoadingSpinner as Spinner } from '@/styles';

const LoadingSpinner = ({ isBottomLoader }) => (
  <Spinner className={isBottomLoader ? 'is-bottom-loader' : ''}>
    <LoaderComponent />
  </Spinner>
);

export default LoadingSpinner;
