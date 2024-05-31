import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPhotoTopic } from '@/store/photoSlice';

import { Container } from '@/styles';
import {
  Content,
  ContentWrapper,
  Description,
  Image,
  StyledLink,
  Subtitle,
  TopicStats,
} from './PhotoTopic.styles';
import { useEffect } from 'react';

const PhotoTopic = () => {
  const dispatch = useDispatch();
  const { searchWord } = useParams();

  const topic = useSelector((state) => state.photo.topic);

  useEffect(() => {
    dispatch(fetchPhotoTopic({ slug: searchWord }));
  }, [dispatch, searchWord]);

  return (
    <>
      {topic.slug && (
        <Container>
          <ContentWrapper>
            <Image src={topic.cover_photo.urls.small} alt={topic.slug} />
            <Content>
              <Subtitle>#{topic.slug}</Subtitle>
              <Description>{topic.description}</Description>
              <TopicStats>{topic.total_photos} photos</TopicStats>
              <StyledLink to="/">Follow</StyledLink>
            </Content>
          </ContentWrapper>
        </Container>
      )}
    </>
  );
};
export default PhotoTopic;
