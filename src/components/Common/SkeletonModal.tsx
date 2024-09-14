import styled from 'styled-components';

const SkeletonModal = () => {
  return (
    <SkeletonWrapper>
      <SkeletonUserInfo>
        <SkeletonAvatar />
        <div>
          <SkeletonText />
          <SkeletonText />
        </div>
      </SkeletonUserInfo>
      <SkeletonImage />
      <SkeletonStats>{renderSkeletonTexts(4, '15%')}</SkeletonStats>
      <SkeletonText style={{ width: '50%' }} />
      {renderSkeletonTexts(2, '20%')}
      <SkeletonButtons>{renderSkeletonDivs(6)}</SkeletonButtons>
    </SkeletonWrapper>
  );
};

const renderSkeletonTexts = (count: number, width: string) => {
  return [...Array(count)].map((_, index) => (
    <SkeletonText key={index} style={{ width }} />
  ));
};

const renderSkeletonDivs = (count: number) => {
  return [...Array(count)].map((_, index) => <div key={index}></div>);
};

export default SkeletonModal;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SkeletonUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SkeletonAvatar = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.cardSurface};
  border-radius: 50%;
`;

const SkeletonText = styled.div`
  height: 20px;
  width: 120px;
  margin: 8px 0;
  background-color: ${({ theme }) => theme.colors.cardSurface};
  border-radius: 4px;
`;

const SkeletonImage = styled.span`
  height: 200px;
  width: 30%;
  margin: 8px auto;
  background-color: ${({ theme }) => theme.colors.cardSurface};
  border-radius: 4px;
`;

export const SkeletonStats = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SkeletonButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  & div {
    width: 80px;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.cardSurface};
    border-radius: 2%;
  }
`;
