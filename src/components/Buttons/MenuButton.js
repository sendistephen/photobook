import { Icon, MenuItem, StyledLink } from './MenuButton.styles';

export default function MenuButton(props) {
  const { item } = props;
  return (
    <StyledLink exact to={item.link} activeClassName='main-nav-active'>
      <MenuItem className='active'>
        <Icon src={item.icon} alt={item.title} />
      </MenuItem>
      <span>{item.title}</span>
    </StyledLink>
  );
}
