import React, { useEffect } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchUserCollections } from '@/store/userSlice';

import {
  Collection,
  CollectionBox,
  Cover,
  StyledSlider,
  Title,
} from './UserCollection.styles';

const UserCollection = () => {
  const { username } = useParams(),
    dispatch = useDispatch();
  useEffect(() => {
    if (username) {
      dispatch(fetchUserCollections({ username }));
    }
  }, [username, dispatch]);

  const collections = useSelector((state) => state.user.collections),
    settings = {
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
