import { Icon, MenuItem, StyledLink } from './MenuButton.styles';

export default function MenuButton(props) {
  const { item } = props;
  return (
    <MenuItem>
      <StyledLink
        to={item.link}
        className={({ isActive }) => (isActive ? 'main-nav-active' : '')}
      >
        <Icon
          toggleTheme={props.toggleTheme}
          src={item.icon}
          alt={item.title}
        />
      </StyledLink>
      <span>{item.title}</span>
    </MenuItem>
  );
}
