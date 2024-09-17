import { getStat } from '@/utils/helper';
import {
  Label,
  PhotoStatistics,
  PhotoStatsWrapper,
  StatBlock as Block,
} from './PhotoModal.styles';

interface PhotoStatsProps {
  photo: Photo | null;
}

const StatBlock = ({
  label,
  value,
}: {
  label: string;
  value: number | undefined;
}) => {
  return (
    <Block>
      <Label color="textSecondary">{label}</Label>
      <Label weight="bold">{value}</Label>
    </Block>
  );
};

const PhotoStats = ({ photo }: PhotoStatsProps) => {
  const stats = getStat(photo);
  return (
    <PhotoStatsWrapper>
      <PhotoStatistics>
        {stats.map((s, index) => (
          <StatBlock key={index} label={s.label} value={s.value} />
        ))}
      </PhotoStatistics>
    </PhotoStatsWrapper>
  );
};

export default PhotoStats;
