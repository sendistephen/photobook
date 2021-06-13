import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
const Icon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 1;
`;
const MenuItem = styled.div`
  width: 40px;
  height: 50px;
  
  display: grid;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  width: 49px;
  height: 49px;
  background: #fff;
  border-radius: 8px;
  color: #999999;
  font-size: 13px;

  display: grid;
  justify-items: center;
`;
