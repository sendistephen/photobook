import {
  Label,
  PhotoStatistics,
  PhotoStatsWrapper,
  StatBlock,
} from './PhotoModal.styles';

interface PhotoStatsProps {
  photo: Photo | null;
}
const PhotoStats = ({ photo }: PhotoStatsProps) => {
  return (
    <PhotoStatsWrapper>
      <PhotoStatistics>
        <StatBlock>
          <Label color="textSecondary">Views</Label>
          <Label weight="bold">{photo?.views}</Label>
        </StatBlock>
        <StatBlock>
          <Label color="textSecondary">Downloads</Label>
          <Label weight="bold">{photo?.downloads}</Label>
        </StatBlock>
      </PhotoStatistics>
    </PhotoStatsWrapper>
  );
};

export default PhotoStats;
