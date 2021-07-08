import Masonry from 'react-masonry-css';
import styled from 'styled-components';

export const GalleryItem = styled.div`
  border-radius: 10px;
`;

export const GalleryImage = styled.img`
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
`;
export const Message = styled.p`
  text-align: center;
  font-weight: bold;
`;
export const LoadingSpinner = styled.div`
  text-align: center;
`;
export const StyledMasonry = styled(Masonry)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  max-width: 100%;
  margin: 50px auto;

  @media (max-width: 568px) {
    max-width: 100%;
  }
`;
