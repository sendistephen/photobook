import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import { Wrapper } from '@/styles';
import {
  Avatar,
  AvatarImg,
  Description,
  FavIcon,
  Icon,
  IconWrapper,
  OptionsMenu,
  PhotoFooter,
  PhotoHeader,
  PhotoImage,
  PhotoWrapper,
  Subtitle,
  TextWrapper,
  PhotoImageWrapper,
  Title,
} from './Photo.styles';
import heartIcon from '@/assets/icons/heart.svg';
import favIcon from '@/assets/icons/star2.svg';
import starIcon from '@/assets/icons/star.svg';
import optionIcon from '@/assets/icons/option.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhoto } from '@/store/photoSlice';
import { Collections } from '@/components';
import { useEffect } from 'react';

const Photo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const photo = useSelector((state) => state.photo.photo);
  const favorited = useSelector((state) => !!state.favorites.photos[photo.id]);

  useEffect(() => {
    dispatch(fetchPhoto(id));
  }, [id, dispatch]);

  return (
    <Wrapper>
      <Collections />

      {photo.user && (
        <PhotoWrapper>
          <PhotoHeader>
            <Link to={`/users/${photo.user.username}`}>
              <Avatar>
                <AvatarImg
                  src={photo.user.profile_image.medium}
                  alt={photo.user.username}
                />
                <TextWrapper>
                  <Title>{photo.user.username}</Title>
                  <Subtitle>{moment(photo.updated_at).fromNow()}</Subtitle>
                </TextWrapper>
              </Avatar>
            </Link>
            <OptionsMenu>
              <Icon src={optionIcon} alt='Options menu' />
            </OptionsMenu>
          </PhotoHeader>

          <Description>{photo.description}</Description>

          {photo.urls && (
            <PhotoImageWrapper>
              <PhotoImage src={photo.urls.small} alt={photo.description} />
            </PhotoImageWrapper>
          )}
          <PhotoFooter>
            <IconWrapper>
              <Icon src={heartIcon} alt='heart icon' />
              <span>{photo.likes}</span>
            </IconWrapper>
            <div></div>
            <FavIcon>
              <Icon
                src={favorited ? favIcon : starIcon}
                onClick={() => console.log(photo)}
                alt='Fav icon'
              />
            </FavIcon>
          </PhotoFooter>
        </PhotoWrapper>
      )}
    </Wrapper>
  );
};

export default Photo;
