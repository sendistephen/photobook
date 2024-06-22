import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { BodyMain, MediumText } from '../../styles/TextStyles';

export const Wrapper = styled.div`
  margin-top: 50px;
  max-width: 80%;
  display: flex;
  justify-content: center;
`;
export const Image = styled.img`
  width: 183px;
  height: 183px;
  border-radius: 8px;
`;
export const ContentWrapper = styled.div`
  margin-left: 15px;
  padding-top: 50px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 30px;
  justify-content: center;
  align-content: center;
`;
export const Content = styled.div`
  display: grid;
  grid-template-rows: auto;
  gap: 16px;
`;
export const StyledLink = styled(Link)`
  width: 100px;
  display: grid;
  justify-content: center;
  color: white;
  font-weight: bold;
  padding: 12px 16px;
  background: #1877f2 0% 0% no-repeat padding-box;
  border-radius: 8px;
`;
export const Subtitle = styled(MediumText)`
  text-transform: capitalize;
  color: ${(props) => props.theme.linkColor};
`;

export const Description = styled(BodyMain)`
  color: ${(props) => props.theme.text};
`;

export const TopicStats = styled(BodyMain)`
  color: ${(props) => props.theme.neutral};
`;
