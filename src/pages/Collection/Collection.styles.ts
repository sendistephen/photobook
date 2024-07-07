import styled from 'styled-components';

export const CollectionContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing['6xl']};
`;

export const CollectionTitle = styled.h1`
  margin-top: 100px;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  font-size: ${({ theme }) => theme.fonts['3xl']};
  font-weight: bold;
`;
