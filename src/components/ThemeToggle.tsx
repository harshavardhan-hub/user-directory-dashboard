import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/slices/themeSlice';
import { Button } from './ui/Button';

export const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: RootState) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      className="flex items-center"
    >
      {isDark ? (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
      {isDark ? 'Light' : 'Dark'} Mode
    </Button>
  );
};
