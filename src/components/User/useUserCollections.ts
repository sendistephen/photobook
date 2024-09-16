import { useUserData } from "./useUserData";

interface Props {
  username: string;
}
const useUserCollections = ({ username }: Props) => {
  return useUserData<Collection>({ username, endpoint: 'collections' });
};

export default useUserCollections;
