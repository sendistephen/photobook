import { useState } from 'react';
import { useDispatch } from 'react-redux';
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
  StyledBars3Icon,
  BuggerIcon,
  StyledXMarkIcon,
} from './Navbar.styles';
import { Container } from 'styles';
import ThemeIcon from 'assets/icons/theme.svg';
import { menu } from 'data/menu';
import MenuButton from 'components/Buttons';
import { toggleThemeChange } from 'store/themeSlice';

const Navbar = (props) => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const handleToggle = () => {
    dispatch(toggleThemeChange());
  };

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

          <BuggerIcon>
            {isOpen ? (
              <StyledXMarkIcon onClick={() => setIsOpen(!isOpen)} />
            ) : (
              <StyledBars3Icon onClick={() => setIsOpen(!isOpen)} />
            )}
          </BuggerIcon>
          <MenuWrapper isOpen={isOpen}>
            <>
              {menu.map((item, index) => (
                <MenuButton key={index} item={item} />
              ))}
              <MenuThemeItem onClick={handleToggle}>
                <Theme>
                  <Image src={ThemeIcon} alt='Theme Icon' />
                </Theme>
                <Label>Theme</Label>
              </MenuThemeItem>
              {/* check if user is authenticated */}
              {!isAuthenticated && (
                <Login onClick={() => loginWithRedirect()}>Login</Login>
              )}
              {isAuthenticated && (
                <Logout
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  <Title>Log out</Title>
                </Logout>
              )}
            </>
          </MenuWrapper>
        </HeaderContainer>
      </Container>
    </Header>
  );
};

export default Navbar;
