import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSyncUrlWithSelectedPhoto = (selectedPhotoId: string | undefined) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPhotoId) {
      navigate(`/photos/${selectedPhotoId}`);
    }
  }, [selectedPhotoId, navigate]);
};

export default useSyncUrlWithSelectedPhoto;
