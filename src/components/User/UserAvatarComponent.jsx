import { shortenNumber } from '@/utils/helper';

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

export const UserAvatarComponent = ({ user }) => (
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
);
