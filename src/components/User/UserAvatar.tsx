import { shortenNumber } from '../../utils/helper';

import { Instagram, Twitter } from 'lucide-react';
import {
  Avatar,
  AvatarContainer,
  Followers,
  Following,
  Posts,
  Stats,
  StyledLink,
  Tag,
  TagsContainer,
  UserInfo,
} from '../../pages/UserProfile/UserProfile.styles';
import IconWrapper from '../Common/IconWrapper';
import { Label } from '../PhotoModal/PhotoModal.styles';

const StatItem = ({ count, label }: { count: number; label: string }) => (
  <>
    <Label size="md">{shortenNumber(count)}</Label>
    <Label size="xs">{label}</Label>
  </>
);
const UserAvatar = ({ user }: { user: User }) => {
  return (
    <AvatarContainer>
      <Avatar src={user.profile_image.large} alt={user.name} />
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
        {user.social.instagram_username && (
          <StyledLink
            to={`https://instagram.com/${user.social.instagram_username}`}
          >
            <IconWrapper icon={Instagram} color="textSecondary" />
            <Label color="textSecondary">
              {user.social.instagram_username}
            </Label>
          </StyledLink>
        )}
        {user.social.twitter_username && (
          <StyledLink
            to={`https://twitter.com/${user.social.twitter_username}`}
          >
            <IconWrapper icon={Twitter} color="textSecondary" />
            <Label color="textSecondary">{user.social.twitter_username}</Label>
          </StyledLink>
        )}

        <Label>Interests</Label>
        <TagsContainer>
          {user.tags.custom.map((interest, index) => (
            <Tag key={index}>{interest.title}</Tag>
          ))}
        </TagsContainer>
      </UserInfo>
    </AvatarContainer>
  );
};

export default UserAvatar;
