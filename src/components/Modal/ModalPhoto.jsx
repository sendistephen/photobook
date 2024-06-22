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
import { PhotoLikes } from './PhotoLikes';

export const ModalPhoto = ({ photo, favorited, handleSaveFavoritePhoto }) => (
  <>
    <PhotoImageWrapper>
      <Link to={`/photos/${photo.id}`} key={photo.id}>
        <PhotoImage src={photo.urls.small} alt={photo.description} />
      </Link>
    </PhotoImageWrapper>
    <PhotoFooter>
      <PhotoLikes likes={photo.likes} />
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
