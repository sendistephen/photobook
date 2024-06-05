import heartIcon from '@/assets/icons/heart.svg';
import { IconWrapper } from '@/pages/Photo/Photo.styles';

export const PhotoLikes = ({ likes }) => (
  <IconWrapper>
    <Icon src={heartIcon} alt="heart icon" />
    <span>{likes}</span>
  </IconWrapper>
);
