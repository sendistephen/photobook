import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCollections } from '@/store/userSlice';

import {
  Collection,
  StyledSlider,
  CollectionBox,
  Cover,
  Title,
} from '@/UserCollection.styles';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

const UserCollection = () => {
  const { username } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (username) {
      dispatch(fetchUserCollections({ username }));
    }
  }, [username, dispatch]);

  const collections = useSelector((state) => state.user.collections);

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
