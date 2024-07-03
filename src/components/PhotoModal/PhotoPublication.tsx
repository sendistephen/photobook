import { Calendar, Camera } from 'lucide-react';
import moment from 'moment';
import IconWrapper from '../Common/IconWrapper';
import {
  Label,
  PhotoPublication,
  PhotoPublicationItem,
} from './PhotoModal.styles';

interface PhotoPublicationProps {
  photo: Photo | null;
}

const PhotoPublicationInfo = ({ photo }: PhotoPublicationProps) => {
  return (
    <PhotoPublication>
      <PhotoPublicationItem>
        <IconWrapper icon={Calendar} />
        <Label color="textSecondary">
          Published on {moment(photo?.published_at).format('LL')}
        </Label>
      </PhotoPublicationItem>
      <PhotoPublicationItem>
        <IconWrapper icon={Camera} />
        <Label color="textSecondary">
          {photo?.exif.name || 'No camera info'}
        </Label>
      </PhotoPublicationItem>
    </PhotoPublication>
  );
};
export default PhotoPublicationInfo;
