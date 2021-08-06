import styled from 'styled-components';

export const Collection = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  overflow-y: hidden;
  overflow-x: scroll;
  margin-right: 100px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export const AddCollection = styled.div`
  width: 120px;
  height: 180px;
  background-color: green;
  border-radius: 5px;
`;

export const CollectionItem = styled.div`
  position: relative;
`;
export const Image = styled.img`
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;
export const ImageHolder = styled.div`
  margin-right: 20px;
`;
export const Title = styled.p`
  font-size: 13px;
  position: absolute;
  color: white;
  font-weight: bold;
  bottom: 20px;
  left: 20px;
`;
