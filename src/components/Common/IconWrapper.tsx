import React from 'react';
import styled from 'styled-components';
import { Theme } from 'types/theme';

type IconType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

interface IconWrapperProps {
  icon: IconType;
  size?: string;
  color?: keyof Theme['colors'];
}

const StyledIconWrapper = styled.span<{
  size?: string;
  color?: keyof Theme['colors'];
}>`
  color: ${({ color, theme }) => (color ? theme.colors[color] : 'inherit')};
  svg {
    width: ${({ size }) => size || '1em'};
    height: ${({ size }) => size || '1em'};
    fill: none;
    stroke: currentColor;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper: React.FC<IconWrapperProps> = ({
  icon: Icon,
  size,
  color,
}) => {
  return (
    <StyledIconWrapper size={size} color={color}>
      <Icon />
    </StyledIconWrapper>
  );
};

export default IconWrapper;
