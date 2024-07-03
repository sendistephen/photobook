import { SunMoon } from 'lucide-react';
import { menu } from '../../data/menu';
import { Container } from '../../styles';
import IconWrapper from '../Common/IconWrapper';
import NavLinks from '../NavLinks';

import { AuthControls } from './AuthControls';
import {
  BuggerIcon,
  Header,
  HeaderContainer,
  MenuThemeItem,
  MenuWrapper,
  StyledBars3Icon,
  StyledXMarkIcon,
} from './Navbar.styles';
import { SearchBar } from './SearchBar';
import { useNavbar } from './useNavbar';

interface NavbarProps {
  handleToggle: () => void;
}

const MenuItems = ({ handleToggle }: NavbarProps) => (
  <>
    {menu.map((item, index) => (
      <NavLinks key={index} item={item} />
    ))}
    <MenuThemeItem onClick={handleToggle}>
      <IconWrapper icon={SunMoon} color="onSurface" />
    </MenuThemeItem>
    <AuthControls />
  </>
);

const Navbar = () => {
  const { isOpen, setIsOpen, handleToggle } = useNavbar();

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
            <MenuItems handleToggle={handleToggle} />
          </MenuWrapper>
        </HeaderContainer>
      </Container>
    </Header>
  );
};

export default Navbar;
