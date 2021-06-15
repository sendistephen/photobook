import MenuButton from 'components/Buttons/MenuButton';
import { menu } from 'data/menu';
import { Component } from 'react';
import {
  FormGroup,
  Header,
  HeaderContainer,
  Input,
  MenuWrapper,
  Wrapper,
  SearchIcon,
} from './Navbar.styles';
import searchIcon from 'assets/icons/search.svg';

export default class Navbar extends Component {
  render() {
    return (
      <Header>
        <HeaderContainer>
          <form>
            <FormGroup>
              <SearchIcon src={searchIcon} alt='Search Icon' />
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
