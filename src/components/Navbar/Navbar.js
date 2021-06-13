import MenuButton from 'components/Buttons/MenuButton';
import { menu } from 'data/menu';
import { Component } from 'react';
import styled from 'styled-components';

export default class Navbar extends Component {
  render() {
    return (
      <Header>
        <HeaderContainer>
          <form>
            <FormGroup>
              <img
                className='searchIcon'
                src='/images/search.svg'
                alt='Search Icon'
              />
              <Input type='text' placeholder='Search...' />
            </FormGroup>
          </form>
          <Wrapper>
            <MenuWrapper>
              {menu.map((item, index) => (
                <MenuButton key={index} item={item} />
              ))}
            </MenuWrapper>
          </Wrapper>
        </HeaderContainer>
      </Header>
    );
  }
}

const Header = styled.header`
  background: #fcfcfd;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;
const HeaderContainer = styled.div`
  max-width: 60%;
  margin: auto;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
  gap: 50px;
  padding: 20px 0px 30px;
`;
const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .searchIcon {
    position: absolute;
    width: 19px;
    height: 19px;
    margin-left: 16px;
    fill: black;
  }
`;
const Input = styled.input`
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
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 14px;
`;
const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px;
`;
