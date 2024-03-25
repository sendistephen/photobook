import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BiSearch } from 'react-icons/bi';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

export const Header = styled.header`
  border-bottom: 2px solid ${(props) => props.theme.secondary};
  background: ${(props) => props.theme.secondary};
  box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.08);
`;
export const HeaderContainer = styled.div`
  margin-left: 15px;
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-template-columns: 1fr auto;
  gap: 50px;
  padding: 12px 0px 20px;
`;
export const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export const Input = styled.input`
  background-color: ${(props) => props.theme.main};
  color: ${(props) => props.theme.neutral};
  border: 1px solid ${(props) => props.theme.borderColor};
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
const shouldNotForwardProp = (prop) => !['isOpen'].includes(prop);

// Using the utility function with styled-components' .withConfig
export const MenuWrapper = styled.div.withConfig({
  shouldForwardProp: shouldNotForwardProp,
})`
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

  &.main-nav-active {
    &:first-child {
      background: #a2c8fa 0% 0% no-repeat padding-box;
    }
    :last-of-type {
      background: #ffb4bc 0% 0% no-repeat padding-box;
    }
  }
`;

export const MenuThemeItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: row;
  }
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
  color: #999999;
  @media (max-width: 768px) {
    margin-left: 12px;
  }
`;
export const Login = styled.div`
  padding: 8px;
  margin-top: -17px;
  display: flex;
  justify-content: center;
  color: black;
  align-items: center;
  background: ${(props) => props.theme.activeLink};
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: black;
    color: white;
  }
`;
export const Logout = styled.div`
  padding: 5px;
  margin-top: -17px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #c36060;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #c36060;
    color: white;
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
