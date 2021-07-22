import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import {
  FormGroup,
  Header,
  HeaderContainer,
  Input,
  MenuWrapper,
  SearchIcon,
  Image,
  Theme,
  Label,
  MenuThemeItem,
} from './Navbar.styles';
import searchIcon from 'assets/icons/search.svg';
import { Container } from 'styles';
import ThemeIcon from 'assets/icons/theme.svg';
import { menu } from 'data/menu';
import MenuButton from 'components/Buttons';

class Navbar extends Component {
  state = {
    query: '',
  };

  handleSearch = (e) => {
    this.setState({ query: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search/photos/${this.state.query}`);
    this.setState({ query: '' });
  };

  render() {
    return (
      <Header>
        <Container>
          <HeaderContainer>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <SearchIcon src={searchIcon} alt='Search Icon' />
                <Input
                  value={this.state.query}
                  onChange={this.handleSearch}
                  type='text'
                  placeholder='Search...'
                />
              </FormGroup>
            </form>

            <MenuWrapper>
              {menu.map((item, index) => (
                <MenuButton key={index} item={item} />
              ))}

              <MenuThemeItem onClick={this.props.toggleTheme}>
                <Theme>
                  <Image src={ThemeIcon} alt='Theme Icon' />
                </Theme>
                <Label>Theme</Label>
              </MenuThemeItem>
            </MenuWrapper>
          </HeaderContainer>
        </Container>
      </Header>
    );
  }
}
export default withRouter(Navbar);
