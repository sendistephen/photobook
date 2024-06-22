import styled from 'styled-components';

import { MediumText, NormalText } from '../../styles/TextStyles';

export const UserAvatar = styled.div`
  margin-top: 30px;
  display: grid;
  justify-content: center;
  gap: 15px;
  a {
    color: ${(props) => props.theme.linkColor};
    justify-self: center;
  }
`;
export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  justify-self: center;
`;
export const Title = styled(MediumText)`
  color: ${(props) => props.theme.text};
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
export const Number = styled(MediumText)`
  color: ${(props) => props.theme.text};
`;
export const SmallText = styled(NormalText)`
  font-weight: 200;
  color: ${(props) => props.theme.neutral};
`;
export const Followers = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  gap: 10px;
`;
export const Following = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  align-content: center;
  gap: 10px;
`;
