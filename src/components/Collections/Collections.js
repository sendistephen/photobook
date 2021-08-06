import {
  CollectionItem,
  Collection,
  Image,
  ImageHolder,
  Title,
} from 'components/Collections/Collections.styles';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCollections } from 'store/collections/collectionsActions';

const Collections = (props) => {
  useEffect(() => {
    props.fetchCollections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { collections } = props.data;
  return (
    <Collection>
      {collections.map((collection) => (
        <CollectionItem key={collection.id}>
          <ImageHolder>
            <Image
              src={collection.cover_photo.urls.small}
              alt={collection.title}
            />
          </ImageHolder>
          <Title>{collection.title}</Title>
        </CollectionItem>
      ))}
    </Collection>
  );
};
const mapStateToProps = (state) => ({
  data: state.collections,
});
const mapDispatchToProps = {
  fetchCollections,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
