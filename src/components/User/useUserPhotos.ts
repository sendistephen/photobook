import { useUserData } from './useUserData';

interface Props {
  username: string;
}
const useUserPhotos = ({ username }: Props) => {
  return useUserData<Photo>({ username, endpoint: 'photos' });
};

export default useUserPhotos;
