import { StyledLink } from './NavLinks.styles';

interface NavLinksProps {
  item: {
    title: string;
    link: string;
  };
}

export default function NavLinks({ item }: NavLinksProps) {
  return (
    <StyledLink to={item.link}>
      <span>{item.title}</span>
    </StyledLink>
  );
}
