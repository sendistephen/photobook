import { useMemo } from 'react';
import {
  SkeletonContainer,
  SkeletonWrapper,
  StyledSkeleton,
} from '../Gallery/Gallery.styles';

interface SkeletonProps {
  count: number;
}

// Pre-defined skeleton heights to create more realistic loading patterns
const skeletonHeights = [250, 300, 280, 320, 260, 340, 290, 310, 270, 330, 240, 350];

const SkeletonLoader = ({ count }: SkeletonProps) => {
  const skeletonElements = useMemo(() => {
    return [...Array(count)].map((_, index) => {
      const height = skeletonHeights[index % skeletonHeights.length];
      return (
        <SkeletonWrapper key={`skeleton-${index}`}>
          <StyledSkeleton 
            data-testid="skeleton" 
            style={{ height: `${height}px` }}
          />
        </SkeletonWrapper>
      );
    });
  }, [count]);

  return (
    <SkeletonContainer>
      {skeletonElements}
    </SkeletonContainer>
  );
};

export default SkeletonLoader;
