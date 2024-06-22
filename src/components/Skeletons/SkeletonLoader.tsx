import {
  SkeletonContainer,
  SkeletonWrapper,
  StyledSkeleton,
} from '../Gallery/Gallery.styles';

interface SkeletonProps {
  count: number;
}

const SkeletonLoader = ({ count }: SkeletonProps) => {
  return (
    <SkeletonContainer>
      {[...Array(count)].map((_, index) => (
        <SkeletonWrapper key={index}>
          <StyledSkeleton />
        </SkeletonWrapper>
      ))}
    </SkeletonContainer>
  );
};
export default SkeletonLoader;
