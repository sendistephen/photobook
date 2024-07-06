import { Link } from 'react-router-dom';

import starIcon from '../../assets/icons/star.svg';
import favIcon from '../../assets/icons/star2.svg';

import {
  FavIcon,
  Icon,
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
