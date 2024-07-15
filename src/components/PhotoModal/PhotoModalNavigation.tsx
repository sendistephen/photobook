import React from 'react';
import { NavigationWrapper } from './PhotoModal.styles';
import PhotoNavigation from './PhotoNavigation';

interface PhotoModalNavigationProps {
  handleNavigation: (offset: number) => void;
}

const PhotoModalNavigation: React.FC<PhotoModalNavigationProps> = (props) => {
  return (
    <NavigationWrapper>
      <PhotoNavigation
        direction="left"
        onClick={() => props.handleNavigation(-1)}
      />
      <PhotoNavigation
        direction="right"
        onClick={() => props.handleNavigation(1)}
      />
    </NavigationWrapper>
  );
};

export default PhotoModalNavigation;
