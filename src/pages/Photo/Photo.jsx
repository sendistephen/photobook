import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import heartIcon from '@/assets/icons/heart.svg';
import optionIcon from '@/assets/icons/option.svg';
import starIcon from '@/assets/icons/star.svg';
import favIcon from '@/assets/icons/star2.svg';
import { Collections } from '@/components';
import { fetchPhoto } from '@/store/photoSlice';
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
  PhotoImageWrapper,
  PhotoWrapper,
  Subtitle,
  TextWrapper,
  Title,
} from './Photo.styles';

const Photo = () => {
  const { id } = useParams(),
    dispatch = useDispatch(),
    photo = useSelector((state) => state.photo.photo),
    favorited = useSelector((state) =>
      Boolean(state.favorites.photos[photo.id]),
    );

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
              <Icon src={optionIcon} alt="Options menu" />
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
              <Icon src={heartIcon} alt="heart icon" />
              <span>{photo.likes}</span>
            </IconWrapper>
            <div></div>
            <FavIcon>
              <Icon
                src={favorited ? favIcon : starIcon}
                onClick={() => console.log(photo)}
                alt="Fav icon"
              />
            </FavIcon>
          </PhotoFooter>
        </PhotoWrapper>
      )}
    </Wrapper>
  );
};

export default Photo;
