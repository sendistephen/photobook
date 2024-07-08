import { AppDispatch } from '@/store';
import { hideModal } from '@/store/modalSlice';
import { HeartIcon, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconWrapper from '../Common/IconWrapper';
import {
  Label,
  PhotoHeaderContainer,
  PhotoHeaderCTA,
  PhotoHeaderImage,
  PhotoHeaderInfo,
  PhotoHeaderUser,
  StyledButton,
} from './PhotoModal.styles';

interface PhotoModalHeaderProps {
  photo: Photo | null;
  onFavorite: () => void;
  isFavorited: boolean;
}

const PhotoModalHeader = ({
  photo,
  onFavorite,
  isFavorited,
}: PhotoModalHeaderProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  if (!photo) return null;

  const handleUserClick = () => {
    dispatch(hideModal());
    navigate(`/users/${photo.user.username}`, { replace: true });
  };

  const isFavoriteIconColor = isFavorited ? 'error' : 'textSecondary';

  return (
    <PhotoHeaderContainer>
      <PhotoHeaderUser onClick={handleUserClick}>
        <PhotoHeaderImage
          src={photo?.user.profile_image.small}
          alt="Carl Dunn"
        />
        <PhotoHeaderInfo>
          <Label weight="bold">{photo?.user.name}</Label>
          <Label weight="100" color="textSecondary" size="xs">
            {photo?.user.username}
          </Label>
        </PhotoHeaderInfo>
      </PhotoHeaderUser>
      <PhotoHeaderCTA>
        <StyledButton onClick={onFavorite}>
          <IconWrapper
            icon={HeartIcon}
            size="1.5em"
            color={isFavoriteIconColor}
          />
        </StyledButton>
        <StyledButton>
          <IconWrapper icon={Plus} size="1.5em" />
        </StyledButton>
      </PhotoHeaderCTA>
    </PhotoHeaderContainer>
  );
};
export default PhotoModalHeader;
