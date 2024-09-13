import { StyledNavLink } from '@/styles/GlobalStyles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AvatarContainer = styled.div`
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
  gap: ${({ theme }) => theme.spacing.md};
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

export const Tabs = styled.div`
  padding: 16px 0;
  margin-top: 100px;
  margin-bottom: 30px;
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 70px;
  z-index: 1000;
`;

export const TabLink = StyledNavLink;
