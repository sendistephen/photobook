import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledMasonry } from 'styles';
import { theme } from 'styles/ColorStyles';
import { MediumText, NormalText,  } from 'styles/TextStyles';

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
`;
export const StyledLink = styled(Link)`
  color: ${theme.light.text2};
  text-decoration: underline;

  &:hover {
    color: ${theme.light.text};
  }
`;
export const Title = styled(MediumText)`
  margin-bottom: 10px;
`;
export const TagsWrapper = styled.div`
  padding-left: -10px;
  margin-bottom: 10px;
`;
export const Tag = styled.span`
  margin-right: 10px;
  padding: 8px;
  background-color: #eee;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  display: -moz-inline-grid;
`;
export const Stats = styled(NormalText)`
  margin-top: 20px;
  color: ${theme.light.text2};
  font-weight: 200;
`;
