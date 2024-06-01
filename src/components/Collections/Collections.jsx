import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Collection,
  CollectionItem,
  Image,
  ImageHolder,
  Title,
} from '@/components/Collections/Collections.styles';
import { fetchCollections } from '@/store/collectionSlice';

const Collections = () => {
  const dispatch = useDispatch(),
    collections = useSelector((state) => state.collections.collections);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  return (
    <Collection>
      {collections.map((collection) => (
        <Link key={collection.id} to={`/collections/${collection.id}/photos`}>
          <CollectionItem>
            <ImageHolder>
              <Image
                src={collection.cover_photo.urls.small}
                alt={collection.title}
              />
            </ImageHolder>
            <Title>{collection.title}</Title>
          </CollectionItem>
        </Link>
      ))}
    </Collection>
  );
};

export default Collections;
