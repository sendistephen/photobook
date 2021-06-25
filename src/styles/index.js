import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  border: 10px solid #ffffff;
  border-radius: 60px;
  margin: 73px auto;
  opacity: 1;
  background-color: #f8fafb;

  @media (max-width: 568px) {
    max-width: 100%;
    margin-left: 15px;
    margin-right: 15px;
  }
`;
export const Wrapper = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;
