import styled from 'styled-components';

export const FavoritesContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing['6xl']};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['3xl']};
`;
