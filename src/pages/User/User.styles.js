import { Link } from 'react-router-dom';
import { theme } from 'styles/ColorStyles';
import { MediumText, NormalText } from 'styles/TextStyles';

const { default: styled } = require('styled-components');

export const UserAvatar = styled.div`
  margin-top: 30px;
  display: grid;
  justify-content: center;
  gap: 15px;
`;
export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  justify-self: center;
`;
export const Title = styled(MediumText)`
  color: ${theme.light.text};
  justify-self: center;
`;
export const StyledLink = styled(Link)`
  color: ${theme.light.text2};
  justify-self: center;
`;
export const Stats = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: auto auto auto;
  gap: 50px;
`;
export const Posts = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  gap: 10px;
`;
export const Number = styled(MediumText)``;
export const SmallText = styled(NormalText)`
  font-weight: 200;
  color: ${theme.light.text2};
`;
export const Followers = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  gap: 10px;
`;
export const Followering = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  align-content: center;
  gap: 10px;
`;
