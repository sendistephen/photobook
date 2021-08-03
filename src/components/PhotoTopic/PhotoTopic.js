import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPhotoTopic } from 'store/photo/photoActions';
import { Container } from 'styles';
import {
  Image,
  Content,
  ContentWrapper,
  StyledLink,
  Subtitle,
  Description,
  TopicStats,
} from './PhotoTopic.styles';

class PhotoTopic extends Component {
  componentDidMount = () => {
    this.props.fetchPhotoTopic({ slug: this.props.match.params.searchWord });
  };
  componentDidUpdate = (prevProps, prevState) => {
    const { searchWord } = this.props.match.params;
    if (
      prevProps.match.params.searchWord !== this.props.match.params.searchWord
    ) {
      this.props.fetchPhotoTopic({ slug: searchWord });
    }
  };

  render() {
    const { topic } = this.props.photo;
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
                <StyledLink to='/'>Follow</StyledLink>
              </Content>
            </ContentWrapper>
          </Container>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  photo: state.photo,
});
const mapDispatchToProps = {
  fetchPhotoTopic,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PhotoTopic));
