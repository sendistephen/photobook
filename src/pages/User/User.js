import axios from 'axios';
import React, { Component } from 'react';
import truncateZero from 'truncate-zero';
import Loader from 'react-loader-spinner';
import { LoadingSpinner } from 'pages/Photo/Photo.styles';
import { Wrapper } from 'styles';
import {  getUserUrl } from 'utils/api';

import {
  UserAvatar,
  Avatar,
  Title,
  StyledLink,
  Stats,
  Posts,
  Followers,
  Followering,
  Number,
  SmallText,
} from './User.styles';

import UserPhotos from 'pages/UserPhotos';
import UserCollection from 'components/UserCollection';

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
            <StyledLink
              to={{ pathname: `${user.portfolio_url}` }}
              target='_blank'
            >
              {user.portfolio_url}{' '}
            </StyledLink>
            <Stats>
              <Posts>
                <Number>{truncateZero(user.downloads)}</Number>
                <SmallText>Total Downloads</SmallText>
              </Posts>
              <Followers>
                <Number>{truncateZero(user.followers_count)}</Number>
                <SmallText>Followers</SmallText>
              </Followers>
              <Followering>
                <Number>{truncateZero(user.following_count)}</Number>
                <SmallText>Following</SmallText>
              </Followering>
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
