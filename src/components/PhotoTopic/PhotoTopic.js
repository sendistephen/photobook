import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'styles';
import { getSingleTopic } from 'utils/api';
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
  state = {
    topic: {},
    error: null,
  };
  componentDidMount = () => {
    this.fetchSingleTopic();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.match.params.searchWord !== this.props.match.params.searchWord
    ) {
      this.fetchSingleTopic();
    }
  };
  fetchSingleTopic = async () => {
    try {
      const url = getSingleTopic({ slug: this.props.match.params.searchWord });
      const res = await axios(url);
      const data = res.data;
      this.setState({ topic: data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };
  render() {
    const { topic } = this.state;
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
export default withRouter(PhotoTopic);
