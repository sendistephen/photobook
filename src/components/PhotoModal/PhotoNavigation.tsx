import { ChevronLeft, ChevronRight } from 'lucide-react';
import IconWrapper from '../Common/IconWrapper';
import { StyledSliderButton } from './PhotoModal.styles';

interface PhotoNavigationProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

const PhotoNavigation = ({ direction, onClick }: PhotoNavigationProps) => (
  <StyledSliderButton onClick={onClick}>
    <IconWrapper
      color="cardSurface"
      icon={direction === 'left' ? ChevronLeft : ChevronRight}
      size="2rem"
    />
  </StyledSliderButton>
);

export default PhotoNavigation;
