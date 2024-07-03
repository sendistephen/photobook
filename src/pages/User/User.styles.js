import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UserAvatar = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing['3xl']};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: start;
    text-align: start;
  }
  a {
    color: ${(props) => props.theme.linkColor};
    justify-self: center;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
export const Avatar = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  justify-self: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 200px;
    height: 200px;
  }
`;
export const StyledLink = styled(Link)`
  display: flex;
  align-items: start;
  gap: 5px;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Tag = styled.div`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.colors.cardSurface};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fonts.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: capitalize;
`;

export const Stats = styled.div`
  display: flex;
  gap: 50px;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: start;
    gap: 10px;
  }
`;
export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Followers = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
export const Following = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
