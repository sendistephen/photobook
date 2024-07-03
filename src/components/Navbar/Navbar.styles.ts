import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { BiSearch } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface MenuWrapperProps {
  isOpen: boolean;
}

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;
export const HeaderContainer = styled.div`
  margin-left: 15px;
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-template-columns: 1fr auto;
  gap: 50px;
`;
export const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export const Input = styled.input`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textPrimary};
  border: 1px solid ${(props) => props.theme.colors.borderDark};
  padding: 12px 60px;
  width: 100%;
  border-radius: 8px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.text2};
  }
  :-ms-input-placeholder {
    color: ${(props) => props.theme.text2};
  }
  &:focus {
    outline: none;
    width: 100%;
  }
`;
const shouldNotForwardProp = (prop: string) => !['isOpen'].includes(prop);

export const MenuWrapper = styled.div.withConfig({
  shouldForwardProp: shouldNotForwardProp,
})<MenuWrapperProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transition: 0.5s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 30px;
    padding-top: 20px;
    padding-left: 20px;
    background-color: black;
    height: 100vh;
    width: 200px;
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

export const SearchIcon = styled(BiSearch)`
  position: absolute;
  width: 19px;
  height: 19px;
  transform: scale(1.5);
  margin-left: 16px;
  fill: ${(props) => props.theme.borderColor};
`;

export const StyledLink = styled(NavLink)`
  background: ${(props) => props.theme.activeLink};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MenuThemeItem = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
`;
export const Theme = styled.div`
  display: flex;
  padding: 6px;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.activeLink};
  border-radius: 5px;
`;
export const Image = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 1;
`;
export const Label = styled.span`
  margin-top: 2px;
  font-size: 13px;
  color: ${(props) => props.theme.colors.textSecondary};

  @media (max-width: 768px) {
    margin-left: 12px;
  }
`;
export const Login = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  color: black;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sm};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.onSecondary};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    box-shadow 0.3s,
    opacity 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryVariant};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryVariant};
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
`;
export const Logout = styled.button`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fonts.sm};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.onSecondary};
  border: none;
  border-radius: 5px;
  border-style: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    box-shadow 0.3s,
    opacity 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryVariant};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.secondaryVariant};
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
`;
export const Title = styled.h4`
  font-weight: 500;
  font-size: 13px;
`;
export const StyledBars3Icon = styled(Bars3Icon)`
  width: 24px;
  height: 24px;
  z-index: 10000;
  color: ${(props) => props.theme.linkColor};
`;
export const StyledXMarkIcon = styled(XMarkIcon)`
  width: 24px;
  height: 24px;
  z-index: 10000;
  color: ${(props) => props.theme.linkColor};
  display: none;
  @media (max-width: 786px) {
    display: flex;
  }
`;
export const BuggerIcon = styled.div`
  z-index: 1000;
  color: ${(props) => props.theme.linkColor};
  display: none;
  @media (max-width: 786px) {
    display: flex;
  }
`;
