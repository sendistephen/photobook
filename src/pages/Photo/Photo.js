import axios from 'axios';
import { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Wrapper } from 'styles';
import {
  AddCollection,
  Avatar,
  AvatarImg,
  Collection,
  CollectionCards,
  CollectionItems,
  Description,
  FavIcon,
  Icon,
  IconWrapper,
  LoadingSpinner,
  OptionsMenu,
  PhotoFooter,
  PhotoHeader,
  PhotoImage,
  PhotoWrapper,
  Subtitle,
  TextWrapper,
  PhotoImageWrapper,
  Title,
} from './Photo.styles';
import heartIcon from 'assets/icons/heart.svg';
import starIcon from 'assets/icons/star.svg';
import optionIcon from 'assets/icons/option.svg';
import { getPhotoUrl } from 'utils/api';

export default class Photo extends Component {
  state = {
    photo: {},
    isLoading: false,
  };
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.fetchPhoto(id);
  };

  fetchPhoto = async (id) => {
    try {
      this.setState({ isLoading: true });

      const url = getPhotoUrl(id);
      const res = await axios(url);
      const data = await res.data;
      this.setState({
        photo: data,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isLoading, photo } = this.state;
    return (
      <Wrapper>
        <Collection>
          <AddCollection></AddCollection>
          <CollectionCards>
            <CollectionItems></CollectionItems>
            <CollectionItems></CollectionItems>
            <CollectionItems></CollectionItems>
            <CollectionItems></CollectionItems>
          </CollectionCards>
        </Collection>

        {/* photo details */}
        {isLoading ? (
          <LoadingSpinner>
            <Loader type='ThreeDots' color='#32D3AC' />
          </LoadingSpinner>
        ) : (
          ''
        )}
        {photo && (
          <PhotoWrapper>
            {photo.user && (
              <PhotoHeader>
                <Avatar>
                  <AvatarImg
                    src={photo.user.profile_image.medium}
                    alt={photo.user.username}
                  />
                  <TextWrapper>
                    <Title>{photo.user.username}</Title>
                    <Subtitle>12 hours ago</Subtitle>
                  </TextWrapper>
                </Avatar>
                <OptionsMenu>
                  <Icon src={optionIcon} alt='Options menu' />
                </OptionsMenu>
              </PhotoHeader>
            )}
            <Description>{photo.description}</Description>

            {photo.urls && (
              <PhotoImageWrapper>
                <PhotoImage src={photo.urls.small} alt={photo.description} />
              </PhotoImageWrapper>
            )}
            <PhotoFooter>
              <IconWrapper>
                <Icon src={heartIcon} alt='heart icon' />
                <span>{photo.likes}</span>
              </IconWrapper>
              <div></div>
              <FavIcon>
                <Icon src={starIcon} alt='Fav icon' />
              </FavIcon>
            </PhotoFooter>
          </PhotoWrapper>
        )}
      </Wrapper>
    );
  }
}
