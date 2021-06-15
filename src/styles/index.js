import styled from 'styled-components';

export const Container = styled.div`
  max-width: 90%;
  border: 10px solid #ffffff;
  border-radius: 60px;
  margin-top: 73px;
  margin-left: 125px;
  margin-right: 125px;
  opacity: 1;
  background-color: #f8fafb;

  @media (max-width: 568px) {
    max-width: 100%;
    margin-left: 15px;
    margin-right: 15px;
  }
`;
