import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Theme,
  Label,
  MenuThemeItem,
  StyledBars3Icon,
  BuggerIcon,
  StyledXMarkIcon,
} from './Navbar.styles';
import { Container } from '@/styles';
import ThemeIcon from '@/assets/icons/theme.svg';
import { menu } from '@/data/menu';
import MenuButton from '@/components/Buttons';
import { toggleThemeChange } from '@/store/themeSlice';
import { getAuth, signOut } from '@firebase/auth';
import { signInWithGoogle } from '@/firebase/firebaseAuth';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleToggle = () => {
    dispatch(toggleThemeChange());
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/photos/${query}`);
    setQuery('');
  };

  const handleLogout = async () => {
    const auth = getAuth();

    await signOut(auth).catch((error) => {
      console.error('Firebase sign-out error:', error);
    });
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
              {!user && (
                <Login onClick={() => dispatch(signInWithGoogle())}>
                  Login
                </Login>
              )}
              {user && <Logout onClick={handleLogout}>Log out</Logout>}
            </>
          </MenuWrapper>
        </HeaderContainer>
      </Container>
    </Header>
  );
};

export default Navbar;
