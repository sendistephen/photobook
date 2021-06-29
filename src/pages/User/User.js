import axios from 'axios';
import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import { LoadingSpinner } from 'pages/Photo/Photo.styles';
import { Wrapper } from 'styles';
import { getUserUrl } from 'utils/api';

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

class User extends Component {
  state = {
    user: {},
    isLoading: false,
  };

  getUsername = () => {
    return this.props.match.params.username;
  };
  componentDidMount = () => {
    this.fetchUser(this.getUsername());
  };

  fetchUser = async (username) => {
    try {
      this.setState({ isLoading: true });

      const url = getUserUrl(username);
      const res = await axios(url);
      const data = res.data;
      this.setState({
        user: data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { user, isLoading } = this.state;
    const { username } = this.props.match.params;
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

        <UserPhotos name={username} />
      </Wrapper>
    );
  }
}

export default User;
