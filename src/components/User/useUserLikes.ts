import { useUserData } from "./useUserData";

interface Props {
  username: string;
}
const useUserLikes = ({ username }: Props) => {
  return useUserData<Photo>({ username, endpoint: 'likes' });
};

export default useUserLikes;
