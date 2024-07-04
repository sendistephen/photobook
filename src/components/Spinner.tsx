import { Loader } from 'lucide-react';
import styled from 'styled-components';

const Spinner = () => (
  <Wrapper>
    <StyledLoader />
  </Wrapper>
);

export default Spinner;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const StyledLoader = styled(Loader)`
  color: ${({ theme }) => theme.colors.onSurface};
  animation: spin 1s linear infinite;
  width: 30px;
  height: 30px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
