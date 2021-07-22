import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
export const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;
export const SearchIcon = styled.img`
  position: absolute;
  width: 19px;
  height: 19px;
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
`;
export const Theme = styled.div`
  width: 49px;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.activeLink};
  border-radius: 8px;
`;

export const Image = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 1;
`;
export const Label = styled.span`
  margin-top: 2px;
  font-size: 13px;
  color: #999999;
`;
