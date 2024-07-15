import SkeletonModal from '../Common/SkeletonModal';
import PhotoDetails from './PhotoDetails';
import PhotoModalHeader from './PhotoHeader';
import { CloseButton, ModalContainer } from './PhotoModal.styles';

const PhotoModalContent = (props: PhotoModalContentProps) => {
  return (
    <ModalContainer>
      {props.isLoading || !props.photo ? (
        <SkeletonModal />
      ) : (
        <>
          <PhotoModalHeader
            photo={props.photo}
            onFavorite={props.onFavorite}
            isFavorited={props.isFavorited}
          />
          <CloseButton onClick={props.onClose}>&times;</CloseButton>
          <PhotoDetails photo={props.photo} />
        </>
      )}
    </ModalContainer>
  );
};
export default PhotoModalContent;
