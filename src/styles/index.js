import Masonry from 'react-masonry-css';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 0px auto;
  padding: 16px;

  @media (max-width: 568px) {
    max-width: 100%;
    /* margin-left: 15px;
    margin-right: 15px; */
  }
`;
export const Wrapper = styled.div`
  max-width: 680px;
  margin: 100px auto;
`;

export const GalleryItem = styled.div`
  border-radius: 10px;
`;

export const GalleryImage = styled.img`
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
`;
export const MessageBox = styled.div`
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.p`
  width: 100%;
  height: 10%;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.theme.linkColor};
`;
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;

  &.is-bottom-loader {
    min-height: 50px;
  }
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
