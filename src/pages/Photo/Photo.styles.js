import styled from 'styled-components';

import { BodyMain, SmallText, SmallText2 } from '@/styles/TextStyles';

export const PhotoWrapper = styled.div`
  width: 680px;
  height: 800px;
  margin-top: 30px;
  background: ${(props) => props.theme.main} 0% 0% no-repeat padding-box;
  box-shadow: 3px 3px 50px #8181811a;
  border-radius: 8px;
  display: grid;
  gap: 30px;
  padding: 30px;
  margin-bottom: 236px;
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
export const OptionsMenu = styled.div``;
export const AvatarImg = styled.img`
  width: 57px;
  height: 57px;
  border-radius: 5px;
`;
export const TextWrapper = styled.div`
  align-items: center;
`;
export const Title = styled(SmallText2)`
  color: ${(props) => props.theme.text};
`;
export const Subtitle = styled(SmallText)`
  color: ${(props) => props.theme.text};
`;
export const Description = styled(BodyMain)`
  color: ${(props) => props.theme.neutral};
`;
export const PhotoImageWrapper = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
`;
export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;
export const PhotoFooter = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
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
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
export const FavIcon = styled.div`
  fill: #f6cf58;
`;
export const LoadingSpinner = styled.div`
  text-align: center;
`;
