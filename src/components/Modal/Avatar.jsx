import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  AvatarImg,
  Subtitle,
  TextWrapper,
  Title,
} from './Modal.styles';

export const ModalAvatar = ({ user, createdAt }) => (
  <Link to={`/users/${user.username}`}>
    <Avatar>
      <AvatarImg src={user.profile_image.medium} alt={user.username} />
      <TextWrapper>
        <Title>{user.username}</Title>
        <Subtitle>{moment(createdAt).fromNow()}</Subtitle>
      </TextWrapper>
    </Avatar>
  </Link>
);
