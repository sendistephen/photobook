import { withRouter } from 'react-router-dom';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
  FormGroup,
  Header,
  HeaderContainer,
  Input,
  MenuWrapper,
  Image,
  SearchIcon,
  Login,
  Logout,
  Title,
  Theme,
  Label,
  MenuThemeItem,
} from './Navbar.styles';
import { Container } from 'styles';
import ThemeIcon from 'assets/icons/theme.svg';
import { menu } from 'data/menu';
import MenuButton from 'components/Buttons';
import { handleToggleThemeChange } from 'store/theme/themeActions';

const Navbar = (props) => {
  const [query, setQuery] = useState('');

  const { loginWithRedirect, logout } = useAuth0();
  const auth = useSelector((state) => state.auth);
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/search/photos/${query}`);
    setQuery('');
  };

  return (
    <Header>
      <Container>
        <HeaderContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <SearchIcon />
              <Input
                value={query}
                onChange={handleSearch}
                type='text'
                placeholder='Search...'
              />
            </FormGroup>
          </form>

          <MenuWrapper>
            {menu.map((item, index) => (
              <MenuButton key={index} item={item} />
            ))}
            <MenuThemeItem onClick={() => props.handleToggleThemeChange()}>
              <Theme>
                <Image src={ThemeIcon} alt='Theme Icon' />
              </Theme>
              <Label>Theme</Label>
            </MenuThemeItem>
            {!auth.isAuthenticated && (
              <Login onClick={() => loginWithRedirect()}>
                <Title>Login</Title>
              </Login>
            )}
            {auth.isAuthenticated && (
              <Logout
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                <Title>Log out</Title>
              </Logout>
            )}
          </MenuWrapper>
        </HeaderContainer>
      </Container>
    </Header>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  handleToggleThemeChange,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
