import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleThemeChange } from '@/store/themeSlice';

export const useNavbar = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false),
    handleToggle = () => {
      dispatch(toggleThemeChange());
    };
  return {
    isOpen,
    setIsOpen,
    handleToggle,
  };
};
