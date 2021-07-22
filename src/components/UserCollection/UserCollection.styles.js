import styled from 'styled-components';
import Slider from 'react-slick';
import { SmallText2 } from 'styles/TextStyles';

export const Collection = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
`;
export const StyledSlider = styled(Slider)`
  & .slick-slide {
    padding-right: 20px;
  }
  & .slick-slide img {
    object-fit: cover;
  }

  & .slick-prev,
  & .slick-next {
    background: black;
    border-radius: 50px;
    margin-top: -20px;
  }
  & .slick-prev {
    margin-left: -17px;
  }
  & .slick-prev:hover,
  & .slick-next:hover {
    background-color: green;
    color: white;
  }
`;

export const CollectionBox = styled.div`
  height: 100px;
  border-radius: 8px;
`;
export const Cover = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
export const Title = styled(SmallText2)`
  padding-top: 20px;
  text-align: center;
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
`;
