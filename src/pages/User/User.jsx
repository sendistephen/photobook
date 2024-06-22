import { Wrapper } from '../..//styles';
import LoaderComponent from '../../components/LoaderComponent';
import { UserAvatarComponent } from '../../components/User/UserAvatarComponent';
import UserCollection from '../../components/UserCollection';
import { LoadingSpinner } from '../../pages/Photo/Photo.styles';
import UserPhotos from '../../pages/UserPhotos';

import { useUser } from './useUser';

const User = () => {
  const { user, isLoading } = useUser();
  // TODO: use tab menu to show user collections and photos
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
