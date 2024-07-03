import { shortenNumber } from '../../utils/helper';

import { Instagram } from 'lucide-react';
import {
  Avatar,
  Followers,
  Following,
  Posts,
  Stats,
  StyledLink,
  Tag,
  TagsContainer,
  UserAvatar,
  UserInfo,
} from '../../pages/User/User.styles';
import IconWrapper from '../Common/IconWrapper';
import { Label } from '../PhotoModal/PhotoModal.styles';

const StatItem = ({ count, label }) => (
  <>
    <Label size="md">{shortenNumber(count)}</Label>
    <Label size="xs">{label}</Label>
  </>
);
export const UserAvatarComponent = ({ user }) => (
  <UserAvatar>
    <Avatar src={user.profile_image.large} alt={user.first_name} />
    <UserInfo>
      <Label size="3xl" weight="bold">
        {user.name}
      </Label>
      <Label size="sm">
        {user.bio
          ? user.bio
          : `Download free, beautiful high-quality photos curated by ${user.name}`}
      </Label>
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
      <StyledLink to={`https://instagram.com/${user.instagram_username}`}>
        <IconWrapper icon={Instagram} color="textSecondary" />
        <Label color="textSecondary">{user.instagram_username}</Label>
      </StyledLink>

      <Label>Interests</Label>
      <TagsContainer>
        {user.tags.custom.map((interest, index) => (
          <Tag key={index}>{interest.title}</Tag>
        ))}
      </TagsContainer>
    </UserInfo>
  </UserAvatar>
);
