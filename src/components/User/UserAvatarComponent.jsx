import { shortenNumber } from '../../utils/helper';

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
} from '../../pages/User/User.styles';

const StatItem = ({ count, label }) => (
  <>
    <Number>{shortenNumber(count)}</Number>
    <SmallText>{label}</SmallText>
  </>
);
export const UserAvatarComponent = ({ user }) => (
  <UserAvatar>
    <Avatar src={user.profile_image.large} alt={user.first_name} />
    <Title>{user.name}</Title>
    <a href={user.portfolio_url} target="blank">
      {user.portfolio_url}{' '}
    </a>
    <Stats>
      <Posts>
        <StatItem count={user.downloads} label="Downloads" />
      </Posts>
      <Followers>
        <StatItem count={user.followers_count} label="Followers" />
      </Followers>
      <Following>
        <StatItem count={user.following_count} label="Following" />
      </Following>
    </Stats>
  </UserAvatar>
);
