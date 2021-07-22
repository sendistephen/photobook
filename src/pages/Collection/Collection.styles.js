import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledMasonry } from 'styles';
import { MediumText, NormalText } from 'styles/TextStyles';

export const Gallery = styled(StyledMasonry)``;
export const Wrapper = styled.div`
  margin-left: 15px;
  margin-top: 50px;
  display: grid;
  grid-template-rows: reapeat(4, 1fr);
  gap: 20px;
`;
export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Image = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 15px 35px hsla(0, 0%, 0%, 0.2);
`;
export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.linkColor};
  text-decoration: underline;

  &:hover {
    color: ${(props) => props.theme.linkColor};
    opacity: 0.8;
  }
`;
export const Title = styled(MediumText)`
  margin-bottom: 10px;
  color: ${(props) => props.theme.text};
`;
export const TagsWrapper = styled.div`
  padding-left: -10px;
  margin-bottom: 10px;
`;
export const Tag = styled.span`
  margin-right: 10px;
  padding: 8px 16px;
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  display: -moz-inline-grid;
`;
export const Stats = styled(NormalText)`
  margin-top: 20px;
  color: ${(props) => props.theme.neutral};
  font-weight: 300;
`;
