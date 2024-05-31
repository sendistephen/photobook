import { LoadingSpinner } from '@/pages/Photo/Photo.styles';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper } from '@/styles';

import { useParams } from 'react-router-dom';
import {
  Avatar,
  Followers,
  Following,
  Number,
  Posts,
  SmallText,
  Stats,
  Title,
  UserAvatar,
} from './User.styles';

import UserCollection from '@/components/UserCollection';
import UserPhotos from '@/pages/UserPhotos';
import { clearUserPhotos, fetchUser } from '@/store/userSlice';
import { shortenNumber } from '@/utils/helper';
import { useEffect } from 'react';
import LoaderComponent from '@/components/LoaderComponent';

const User = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username));
    }
    return () => {
      dispatch(clearUserPhotos());
    };
  }, [username, dispatch]);

  return (
    <Wrapper>
      {isLoading && (
        <LoadingSpinner>
          <LoaderComponent />
        </LoadingSpinner>
      )}
      {user.profile_image && (
        <UserAvatar>
          <Avatar src={user.profile_image.large} alt={user.first_name} />
          <Title>{user.name}</Title>
          <a href={user.portfolio_url} target="blank">
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

      <UserCollection />
      <UserPhotos />
    </Wrapper>
  );
};

export default User;
