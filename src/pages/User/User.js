import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { LoadingSpinner } from 'pages/Photo/Photo.styles';
import { Wrapper } from 'styles';

import {
  UserAvatar,
  Avatar,
  Title,
  Stats,
  Posts,
  Followers,
  Following,
  Number,
  SmallText,
} from './User.styles';

import UserPhotos from 'pages/UserPhotos';
import UserCollection from 'components/UserCollection';
import { shortenNumber } from 'utils/helper';
import { fetchUser, clearPhotos } from '../../store/user/userActions';

class User extends Component {
  getUsername = () => {
    return this.props.match.params.username;
  };
  componentDidMount = () => {
    this.props.fetchUser(this.getUsername());
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.match.params.username !== this.props.match.params.username) {
      this.props.fetchUser(this.getUsername());
    }
  };
  componentWillUnmount() {
    this.props.clearPhotos();
  }
  render() {
    const { user, isLoading } = this.props.user;
    return (
      <Wrapper>
        {isLoading && (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        )}
        {user.profile_image && (
          <UserAvatar>
            <Avatar src={user.profile_image.large} alt={user.first_name} />
            <Title>{user.name}</Title>
            <a href={user.portfolio_url} target='blank'>
              {user.portfolio_url}{' '}
            </a>
            <Stats>
              <Posts>
                <Number>{shortenNumber(user.downloads)}</Number>
                <SmallText>Total Downloads</SmallText>
              </Posts>
              <Followers>
                <Number>{shortenNumber(user.followers_count)}</Number>
                <SmallText>Followers</SmallText>
              </Followers>
              <Following>
                <Number>{shortenNumber(user.following_count)}</Number>
                <SmallText>Following</SmallText>
              </Following>
            </Stats>
          </UserAvatar>
        )}

        <UserCollection username={this.getUsername()} />

        <UserPhotos name={this.getUsername()} />
      </Wrapper>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = {
  fetchUser,
  clearPhotos,
};
export default connect(mapStateToProps, mapDispatchToProps)(User);
