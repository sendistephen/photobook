import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const LoaderComponent = ({ color = '#32D3AC', height = 80, width = 80 }) => {
  return <ThreeDots color={color} height={height} width={width} />;
};

export default LoaderComponent;
