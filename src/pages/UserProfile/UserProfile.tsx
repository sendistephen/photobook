import { Outlet, useParams } from 'react-router-dom';
import { Wrapper } from '../../styles';

import { UserAvatar } from '@/components';
import Spinner from '@/components/Spinner';
import { TabLink, Tabs } from './UserProfile.styles';
import { useUser } from './useUser';

const UserProfile = () => {
  const { username } = useParams();

  const { user, isLoading, error } = useUser({ username: username ?? null });

  if (isLoading) return <Spinner />;

  if (error) {
    return <span>Error</span>;
  }

  if (!user || user instanceof Error) return <span>User not found</span>;

  return (
    <Wrapper>
      <UserAvatar user={user} />

      <Tabs>
        <TabLink to="photos">Photos</TabLink>
        <TabLink to="likes">Likes</TabLink>
        <TabLink to="collections">Collections</TabLink>
      </Tabs>
      <Outlet />
    </Wrapper>
  );
};
export default UserProfile;
