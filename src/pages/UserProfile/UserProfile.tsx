import { Outlet, useParams } from 'react-router-dom';
import { Wrapper } from '../../styles';

import { UserAvatar } from '@/components';
import Spinner from '@/components/Spinner';
import { TabLink, Tabs } from './UserProfile.styles';
import { useUser } from './useUser';

const UserProfile = () => {
  const { username } = useParams();

  const { user, isLoading, error } = useUser({ username: username ?? null });

  if (isLoading) {
    return (
      <Wrapper>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spinner />
        </div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Error loading user profile</h2>
          <p>Sorry, we couldn't load the user profile. Please try again later.</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </Wrapper>
    );
  }

  if (!user || user instanceof Error) {
    return (
      <Wrapper>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>User not found</h2>
          <p>The user "{username}" could not be found.</p>
        </div>
      </Wrapper>
    );
  }

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
