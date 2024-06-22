import Masonry from 'react-masonry-css';
import styled from 'styled-components';

export const Gallery = styled.div`
  margin-top: 100px;
`;
export const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 16px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;
export const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 150px;
`;

export const SkeletonWrapper = styled.div`
  flex: 1 1 calc(33.333% - 16px);
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 1100px) {
    flex: 1 1 calc(50% - 16px); /* Adjust the percentage for two columns with a gap */
  }

  @media (max-width: 700px) {
    flex: 1 1 100%; /* Full width for single column */
  }

  > div {
    width: 100%;
    display: block;
    background-color: ${(props) => props.theme.skeletonBase};
    &::before {
      background-color: ${(props) => props.theme.skeletonHighlight};
    }
  }
`;
export const StyledSkeleton = styled.div`
  width: 30%;
  height: 300px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.skeletonBase};
  background-image: linear-gradient(
    90deg,
    ${(props) => props.theme.skeletonBase},
    ${(props) => props.theme.skeletonHighlight},
    ${(props) => props.theme.skeletonBase}
  );
  animation: shine 1.6s infinite linear;

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
  width: auto;
  margin-right: -8px;
  margin-left: -16px; /* gutter size offset */

  @media (max-width: 568px) {
    margin-left: 0;
    margin-right: 0;
  }

  .my-masonry-grid_column {
    padding-left: 16px; /* gutter size */
    padding-right: 16px;
    background-clip: padding-box;
  }

  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */
    margin-bottom: 16px;
  }
`;
