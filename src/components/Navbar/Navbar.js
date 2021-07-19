import { withRouter } from 'react-router-dom';
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
import MenuButton from 'components/Buttons';
import { Container } from 'styles';
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

            <Wrapper>
              <MenuWrapper>
                {menu.map((item, index) => (
                  <MenuButton key={index} item={item} />
                ))}
              </MenuWrapper>
            </Wrapper>
          </HeaderContainer>
        </Container>
      </Header>
    );
  }
}
export default withRouter(Navbar);
