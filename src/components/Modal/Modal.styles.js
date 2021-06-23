import styled from 'styled-components';
import Slider from 'react-slick';
import { theme } from 'styles/ColorStyles';
import { SmallText, SmallText2 } from 'styles/TextStyles';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SliderContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
   z-index: 1000;
  
  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;
export const StyledSlider = styled(Slider)`
  width: 580px;
  height: 600px;
  margin: 130px auto;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 3px 3px 50px #8181811a;
  border-radius: 8px;
  padding: 30px;
  z-index: 1001;
  position: fixed;
`;

export const PhotoHeader = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  justify-content: space-between;
`;
export const Avatar = styled.div`
  display: grid;
  grid-template-columns: 60px 150px;
  align-items: center;
  gap: 20px;
`;
export const CloseModal = styled.div``;
export const AvatarImg = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 5px;
`;
export const TextWrapper = styled.div`
  align-items: center;
`;
export const Title = styled(SmallText2)`
  color: ${theme.light.text};
`;
export const Subtitle = styled(SmallText)`
  color: ${theme.light.text2};
`;

export const PhotoImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  padding: 20px 0;
`;
export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
`;
export const PhotoFooter = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
`;
export const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: 30px 35px;
  gap: 10px;
  align-items: center;
  span {
    color: red;
  }
`;
export const Icon = styled.img`
  fill: red;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
export const FavIcon = styled.div`
  fill: #f6cf58;
`;
