import { Component } from 'react';
import styled from 'styled-components';

export default class Navbar extends Component {
  render() {
    return (
      <Header>
        <HeaderContainer>
          <form>
            <FormGroup>
              <Icon
                className='searchIcon'
                src='/images/search.svg'
                alt='Search Icon'
              />
              <Input type='text' placeholder='Search...' />
            </FormGroup>
          </form>
          <Wrapper>
            <div>
              <IconWrapper>
                <Icon src='/images/camera.svg' className='icon' alt='desc' />
              </IconWrapper>
            </div>
            <div>
              <IconWrapper>
                <Icon
                  src='/images/IconlyBulkHeart.svg'
                  className='icon'
                  alt='desc'
                />
              </IconWrapper>
            </div>
            <div>
              <IconWrapper>
                <Icon
                  src='/images/IconlyBulkScan.svg'
                  className='icon'
                  alt='desc'
                />
              </IconWrapper>
            </div>
          </Wrapper>
        </HeaderContainer>
      </Header>
    );
  }
}

const Header = styled.header`
  background: #fcfcfd;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
`;
const HeaderContainer = styled.div`
  max-width: 60%;
  margin: auto;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
  gap: 14px;
  padding: 20px 0 20px;
`;
const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .searchIcon {
    position: absolute;
    margin-left: 16px;
    fill: black;
  }
`;
const Input = styled.input`
  background-color: white;
  border: 1px solid #eee;
  padding: 12px 60px;
  width: 100%;
  border-radius: 8px;

  &:focus {
    outline: none;
    width: 100%;
  }
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 14px;
`;
const IconWrapper = styled.div`
  width: 49px;
  height: 49px;
  background: #fff;
  border-radius: 8px;
  /* background: #a2c8fa 0% 0% no-repeat padding-box; */
  /* opacity: 0.4; */

  display: grid;
  justify-content: center;
  align-content: center;
`;
const Icon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 1;
`;
