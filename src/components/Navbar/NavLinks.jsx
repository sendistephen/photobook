import { StyledLink } from './NavLinks.styles';

export default function NavLinks(props) {
  const { item } = props;
  return (
    <StyledLink to={item.link}>
      <span>{item.title}</span>
    </StyledLink>
  );
}
