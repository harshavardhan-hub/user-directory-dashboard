import React, { ReactNode, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { initializeTheme } from '@/store/slices/themeSlice';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state: RootState) => state.theme);

  // Initialize theme from localStorage on app start
  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  // Apply theme changes to DOM
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#111827'; // dark background
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff'; // light background
    }
  }, [isDark]);

  return <>{children}</>;
};
