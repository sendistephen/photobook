import { shortenNumber } from '../../utils/helper';

import { Instagram, X } from 'lucide-react';
import {
  Avatar,
  AvatarContainer,
  Followers,
  Following,
  Posts,
  Stats,
  StyledLink,
  UserInfo,
} from '@/pages/UserProfile/UserProfile.styles';
import IconWrapper from '../Common/IconWrapper';
import { Label } from '../PhotoModal/PhotoModal.styles';
import { Tag, TagsContainer } from '@/styles/GlobalStyles';

const StatItem = ({ count, label }: { count: number | undefined; label: string }) => (
  <>
    <Label size="md">{count ? shortenNumber(count) : '0'}</Label>
    <Label size="xs">{label}</Label>
  </>
);
const UserAvatar = ({ user }: { user: User }) => {
  if (!user) {
    return null;
  }

  return (
    <AvatarContainer>
      <Avatar 
        src={user.profile_image?.large || user.profile_image?.medium || user.profile_image?.small || ''} 
        alt={user.name || 'User'} 
      />
      <UserInfo>
        <Label size="3xl" weight="bold">
          {user.name || 'Unknown User'}
        </Label>
        <Label size="sm">
          {user.bio
            ? user.bio
            : `Download free, beautiful high-quality photos curated by ${user.name || 'this user'}`}
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
        {user.social?.instagram_username && (
          <StyledLink
            to={`https://instagram.com/${user.social.instagram_username}`}
          >
            <IconWrapper icon={Instagram} color="textSecondary" />
            <Label color="textSecondary">
              {user.social.instagram_username}
            </Label>
          </StyledLink>
        )}
        {user.social?.twitter_username && (
          <StyledLink
            to={`https://twitter.com/${user.social.twitter_username}`}
          >
            <IconWrapper icon={X} color="textSecondary" />
            <Label color="textSecondary">{user.social.twitter_username}</Label>
          </StyledLink>
        )}

        {user.tags?.custom && user.tags.custom.length > 0 && (
          <>
            <Label>Interests</Label>
            <TagsContainer>
              {user.tags.custom.map((interest, index) => (
                <Tag key={index}>{interest.title}</Tag>
              ))}
            </TagsContainer>
          </>
        )}
      </UserInfo>
    </AvatarContainer>
  );
};

export default UserAvatar;
