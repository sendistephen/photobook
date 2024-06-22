import moment from 'moment';
import { Link } from 'react-router-dom';

import optionIcon from '../../assets/icons/option.svg';
import starIcon from '../../assets/icons/star.svg';
import favIcon from '../../assets/icons/star2.svg';
import { Collections } from '../../components';
import { PhotoLikes } from '../../components/Modal/PhotoLikes';
import { Wrapper } from '../../styles';

import {
  Avatar,
  AvatarImg,
  Description,
  FavIcon,
  Icon,
  OptionsMenu,
  PhotoFooter,
  PhotoHeader,
  PhotoImage,
  PhotoImageWrapper,
  PhotoWrapper,
  Subtitle,
  TextWrapper,
  Title,
} from './Photo.styles';
import { usePhoto } from './usePhoto';

const PhotoHeaderComponent = ({ user }) => (
  <PhotoHeader>
    <Link to={`/users/${user.username}`}>
      <Avatar>
        <AvatarImg src={user.profile_image.medium} alt={user.username} />
        <TextWrapper>
          <Title>{user.username}</Title>
          <Subtitle>{moment(user.updated_at).fromNow()}</Subtitle>
        </TextWrapper>
      </Avatar>
    </Link>
    <OptionsMenu>
      <Icon src={optionIcon} alt="Options menu" />
    </OptionsMenu>
  </PhotoHeader>
);

const PhotoFooterComponent = ({ photo, favorited, handleFavorite }) => (
  <PhotoFooter>
    <PhotoLikes likes={photo.likes} />
    <FavIcon>
      <Icon
        src={favorited ? favIcon : starIcon}
        onClick={handleFavorite}
        alt="Fav icon"
      />
    </FavIcon>
  </PhotoFooter>
);

const PhotoImageSection = ({ urls, description }) => (
  <PhotoImageWrapper>
    <PhotoImage src={urls.small} alt={description} />
  </PhotoImageWrapper>
);

const Photo = () => {
  const { photo, favorited } = usePhoto();
  return (
    <Wrapper>
      <Collections />

      {photo.user && (
        <PhotoWrapper>
          <PhotoHeaderComponent user={photo.user} />

          <Description>{photo.description}</Description>

          {photo.urls && (
            <PhotoImageSection
              urls={photo.urls}
              description={photo.description}
            />
          )}

          <PhotoFooterComponent photo={photo} favorited={favorited} />
        </PhotoWrapper>
      )}
    </Wrapper>
  );
};

export default Photo;
