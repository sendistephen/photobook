import LoaderComponent from '@/components/LoaderComponent';
import { UserAvatarComponent } from '@/components/User/UserAvatarComponent';
import UserCollection from '@/components/UserCollection';
import { LoadingSpinner } from '@/pages/Photo/Photo.styles';
import UserPhotos from '@/pages/UserPhotos';
import { Wrapper } from '@/styles';

import { useUser } from './useUser';

const User = () => {
  const { user, isLoading } = useUser();
  return (
    <Wrapper>
      {isLoading && (
        <LoadingSpinner>
          <LoaderComponent />
        </LoadingSpinner>
      )}
      {user.profile_image && <UserAvatarComponent user={user} />}
      <UserCollection />
      <UserPhotos />
    </Wrapper>
  );
};
export default User;
