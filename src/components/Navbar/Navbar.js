import { withRouter } from 'react-router-dom';
import { Component } from 'react';
import { connect } from 'react-redux';
import {
  FormGroup,
  Header,
  HeaderContainer,
  Input,
  MenuWrapper,
  Image,
  SearchIcon,
  Theme,
  Label,
  MenuThemeItem,
} from './Navbar.styles';
import { Container } from 'styles';
import ThemeIcon from 'assets/icons/theme.svg';
import { menu } from 'data/menu';
import MenuButton from 'components/Buttons';
import { handleToggleThemeChange } from 'store/theme/themeActions';

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
                <SearchIcon />
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

              <MenuThemeItem
                onClick={() => this.props.handleToggleThemeChange()}
              >
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
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  handleToggleThemeChange,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
