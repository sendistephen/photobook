import Masonry from 'react-masonry-css';
import styled from 'styled-components';

export const Gallery = styled.div`
  margin-top: 100px;
  cursor: pointer;
`;
export const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.02);
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const BlurPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
  background-size: 200% 200%;
  animation: shimmer 1.5s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% -200%;
    }
    100% {
      background-position: 200% 200%;
    }
  }
  
  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  position: relative;
  z-index: 1;
`;
export const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 100px;
`;

export const SkeletonWrapper = styled.div`
  flex: 1 1 calc(33.333% - 16px);
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 1100px) {
    flex: 1 1 calc(50% - 16px);
  }

  @media (max-width: 700px) {
    flex: 1 1 100%;
  }

  > div {
    width: 100%;
    display: block;
    background-color: ${(props) => props.theme.colors.skeletonBase};
    &::before {
      background-color: ${(props) => props.theme.colors.skeltonHighlight};
    }
  }
`;
export const StyledSkeleton = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.skeletonBase};
  background-image: linear-gradient(
    90deg,
    ${(props) => props.theme.colors.skeletonBase},
    ${(props) => props.theme.colors.skeltonHighlight},
    ${(props) => props.theme.colors.skeletonBase}
  );
  background-size: 200px 100%;
  animation: shine 1.6s infinite linear;
  will-change: background-position;

  @keyframes shine {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;
export const StyledMasonry = styled(Masonry)`
  @media (max-width: 568px) {
    margin-left: 0;
    margin-right: 0;
  }
`;
