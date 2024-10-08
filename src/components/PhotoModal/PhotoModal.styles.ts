import {
  FlexColumnStartNoGap,
  FlexColumnStartSmGap,
  FlexContainer,
  FlexRowSpaceBetween,
  FlexRowSpaceBetweenCenter,
  TagsContainer,
} from '@/styles/GlobalStyles';
import styled from 'styled-components';
import { LabelProps } from 'types/theme';

export const Overlay = styled(FlexContainer)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 200;
`;
export const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 1200px;
  max-height: 80vh;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 ${({ theme }) => theme.spacing.md};
  }
  /* @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 ${({ theme }) => theme.spacing.xl};
  } */
`;

export const ImageContainer = styled(FlexContainer)`
  width: 100%;
  max-width: 356px;
  height: 500px;
  overflow: hidden;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.cardSurface};
  font-size: 24px;
  cursor: pointer;
`;

export const PhotoImage = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  height: auto;
  object-fit: cover;
`;

export const PhotoContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing['6xl']};
  gap: ${({ theme }) => theme.spacing.md};
`;
export const PhotoStatsWrapper = styled(FlexContainer).attrs({
  justify: 'space-between',
  gap: '3xl',
})``;

export const PhotoStatistics = styled(FlexContainer).attrs({
  justify: 'space-between',
  gap: '6xl',
})``;

export const StatBlock = styled(FlexContainer).attrs({
  flexDirection: 'column',
})``;

export const Label = styled.div<LabelProps>`
  font-size: ${({ size, theme }) =>
    size ? theme.fonts[size] : theme.fonts.sm};
  font-weight: ${({ weight }) => weight || 'normal'};
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.textPrimary};
`;

export const PhotoPublication = styled(FlexColumnStartSmGap)`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const PhotoPublicationItem = styled(FlexContainer).attrs({
  gap: 'xs',
})``;

export const TagContainer = styled(TagsContainer)`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const PhotoHeaderContainer = styled(FlexRowSpaceBetween)`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PhotoHeaderImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

export const PhotoHeaderInfo = FlexColumnStartNoGap;

export const PhotoHeaderUser = styled(FlexContainer).attrs({
  justify: 'space-between',
  gap: 'sm',
})`
  cursor: pointer;
`;

export const PhotoHeaderCTA = styled(FlexContainer).attrs({
  gap: 'sm',
})``;

export const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.cardSurface};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.textSecondary} !important;
  border: 1px solid ${({ theme }) => theme.colors.borderLight} !important;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition:
    border-color 0.3s,
    color 0.3s;

  margin: 0;
  overflow: visible;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderDark} !important;
  }
`;

export const StyledSliderButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fonts.lg};
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.skeltonHighlight};
  }
`;
export const NavigationWrapper = styled(FlexRowSpaceBetweenCenter)`
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 200;
`;
