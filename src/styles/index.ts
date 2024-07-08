import Masonry from 'react-masonry-css';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  margin: 0px auto;
  padding: 16px;

  @media (max-width: 568px) {
    max-width: 100%;
  }
`;
export const Wrapper = styled.div`
  margin-top: 100px;
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
