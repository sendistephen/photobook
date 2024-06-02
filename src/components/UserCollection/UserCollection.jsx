import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

import {
  Collection,
  CollectionBox,
  Cover,
  StyledSlider,
  Title,
} from './UserCollection.styles';
import { useUserCollection } from './useUserCollection';

const UserCollection = () => {
  const { collections } = useUserCollection();

  const settings = {
    dots: collections.length > 1,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: collections.length > 3 ? <BiLeftArrow /> : null,
    prevArrow: collections.length > 3 ? <BiRightArrow /> : null,
  };

  return (
    <Collection>
      <StyledSlider {...settings}>
        {collections.map((collection) => (
          <CollectionBox key={collection.id}>
            <Cover
              src={collection.cover_photo && collection.cover_photo.urls.small}
              alt={collection.title}
            />
            <Title>{collection.title}</Title>
          </CollectionBox>
        ))}
      </StyledSlider>
    </Collection>
  );
};

export default UserCollection;
