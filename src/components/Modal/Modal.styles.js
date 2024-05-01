import styled from 'styled-components';
import Slider from 'react-slick';
import { SmallText, SmallText2 } from '@/styles/TextStyles';

export const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;

  &.show-hide-modal {
    display: ${(props) => (props.show ? 'block' : 'none')};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const StyledSlider = styled(Slider)`
  width: 580px;
  height: 600px;
  margin: 130px auto;
  background: ${(props) => props.theme.main} 0% 0% no-repeat padding-box;
  box-shadow: 3px 3px 50px #8181811a;
  border-radius: 8px;
  padding: 30px;
  z-index: 1001;
  position: fixed;
  @media (max-width: 786px) {
    width: 90%;
    padding: 20px;
  }
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
  @media (max-width: 786px) {
    width: 40px;
    height: 40px;
  }
`;
export const TextWrapper = styled.div`
  align-items: center;
`;
export const Title = styled(SmallText2)`
  color: ${(props) => props.theme.text};
`;
export const Subtitle = styled(SmallText)`
  color: ${(props) => props.theme.linkColor};
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
  @media (max-width: 786px) {
    object-fit: cover;
  }
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
  @media (max-width: 786px) {
    width: 18px;
    height: 18px;
  }
`;
export const FavIcon = styled.div`
  fill: #f6cf58;
`;
