import { Navigate, Outlet, useParams } from 'react-router-dom';
import { Wrapper } from '../../styles';

// import { UserAvatar } from '@/components';
import { UserAvatar } from '@/components';
import { TabLink, Tabs } from './UserProfile.styles';
import { useUser } from './useUser';

const UserProfile = () => {
  const { username } = useParams();

  const { user, isLoading, error } = useUser({ username: username ?? null });

  if (isLoading) return <span>Loading</span>;

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
      {/* <Navigate to={`/users/${username}/photos`} replace /> */}
    </Wrapper>
  );
};
export default UserProfile;
