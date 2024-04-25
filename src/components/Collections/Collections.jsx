import {
  CollectionItem,
  Collection,
  Image,
  ImageHolder,
  Title,
} from '@/components/Collections/Collections.styles';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollections } from '@/store/collectionSlice';

const Collections = (props) => {
  const dispatch = useDispatch();
  const collections = useSelector((state) => state.collections.collections);

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
