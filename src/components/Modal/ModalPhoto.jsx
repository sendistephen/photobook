import React from 'react';
import { Link } from 'react-router-dom';

import heartIcon from '@/assets/icons/heart.svg';
import starIcon from '@/assets/icons/star.svg';
import favIcon from '@/assets/icons/star2.svg';

import {
  FavIcon,
  Icon,
  IconWrapper,
  PhotoFooter,
  PhotoImage,
  PhotoImageWrapper,
} from './Modal.styles';

export const ModalPhoto = ({ photo, favorited, handleSaveFavoritePhoto }) => (
  <>
    <PhotoImageWrapper>
      <Link to={`/photos/${photo.id}`} key={photo.id}>
        <PhotoImage src={photo.urls.small} alt={photo.description} />
      </Link>
    </PhotoImageWrapper>
    <PhotoFooter>
      <IconWrapper>
        <Icon src={heartIcon} alt="heart icon" />
        <span>{photo.likes}</span>
      </IconWrapper>
      <FavIcon>
        <Icon
          onClick={() => handleSaveFavoritePhoto(photo)}
          src={favorited ? favIcon : starIcon}
          alt="Fav icon"
        />
      </FavIcon>
    </PhotoFooter>
  </>
);
