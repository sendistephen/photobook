import {
  CollectionItem,
  Collection,
  Image,
  ImageHolder,
  Title,
} from 'components/Collections/Collections.styles';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
const mapStateToProps = (state) => ({
  data: state.collections,
});
const mapDispatchToProps = {
  fetchCollections,
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
