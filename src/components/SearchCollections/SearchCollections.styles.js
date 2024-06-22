import styled from 'styled-components';

import { GalleryImage, GalleryItem, StyledMasonry } from '../../styles';

export const CollectionItem = styled(GalleryItem)`
  position: relative;
`;
export const CollectionImage = styled(GalleryImage)`
  filter: brightness(70%) saturate(100%);
  align-content: center;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  align-self: center;
`;
export const TotalPhotos = styled.span`
  position: absolute;
  z-index: 10;
  bottom: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Gallery = styled(StyledMasonry)`
  /* max-width: 60%; */
`;
