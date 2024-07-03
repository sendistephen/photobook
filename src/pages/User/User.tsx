import { useParams } from 'react-router-dom';
import { UserAvatarComponent } from '../../components/User/UserAvatarComponent';
import UserCollection from '../../components/UserCollection';
import { Wrapper } from '../../styles';
import UserPhotos from '../UserPhotos';

import { useUser } from './useUser';

const User = () => {
  const { username } = useParams();

  const { user, isLoading, error } = useUser({ username: username ?? null });

  if (isLoading) return <span>Loading</span>;

  if (error) {
    return <span>Error</span>;
  }

  // TODO: use tab menu to show user collections and photos
  return (
    <Wrapper>
      {isLoading && <span>Loading</span>}
      <UserAvatarComponent user={user} />
      <UserCollection />
      <UserPhotos />
    </Wrapper>
  );
};
export default User;
