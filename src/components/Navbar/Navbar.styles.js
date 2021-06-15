import styled from 'styled-components';

export const Header = styled.header`
  background: #fcfcfd;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;
export const HeaderContainer = styled.div`
  max-width: 60%;
  margin: auto;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
  gap: 50px;
  padding: 20px 0px 30px;
`;
export const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  /* .searchIcon {
    position: absolute;
    width: 19px;
    height: 19px;
    margin-left: 16px;
    fill: black;
  } */
`;
export const Input = styled.input`
  background-color: white;
  border: 1px solid #eee;
  padding: 12px 60px;
  width: 100%;
  border-radius: 8px;

  &:focus {
    outline: none;
    width: 100%;
  }
`;
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 14px;
`;
export const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
`;
export const SearchIcon = styled.img`
  position: absolute;
  width: 19px;
  height: 19px;
  margin-left: 16px;
  fill: black;
`;