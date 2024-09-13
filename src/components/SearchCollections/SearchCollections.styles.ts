import { TagsContainer } from '@/styles/GlobalStyles';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CollectionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  transition: transform 0.3s ease-in-out;
`;

export const CollectionCard = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  &:hover {
    ${CollectionImage} {
      transform: scale(1.05);
    }
  }
`;

export const CollectionInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;
export const TagContainer = styled(TagsContainer)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

