import ThemeIcon from '@/assets/icons/theme.svg';
import MenuButton from '@/components/Buttons';
import { menu } from '@/data/menu';
import { toggleThemeChange } from '@/store/themeSlice';
import { Container } from '@/styles';
import { useState } from 'react';
import { AuthControls } from './AuthControls';
import {
  BuggerIcon,
  Header,
  HeaderContainer,
  Image,
  Label,
  MenuThemeItem,
  MenuWrapper,
  StyledBars3Icon,
  StyledXMarkIcon,
  Theme,
} from './Navbar.styles';
import { SearchBar } from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    dispatch(toggleThemeChange());
  };

  return (
    <Header>
      <Container>
        <HeaderContainer>
          <SearchBar />
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
                  <Image src={ThemeIcon} alt="Theme Icon" />
                </Theme>
                <Label>Theme</Label>
              </MenuThemeItem>

              <AuthControls />
            </>
          </MenuWrapper>
        </HeaderContainer>
      </Container>
    </Header>
  );
};

export default Navbar;
