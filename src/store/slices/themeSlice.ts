import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '@/types/user';

// Assignment Requirement: Dark/light theme toggle using Redux
const loadTheme = (): boolean => {
  try {
    const theme = localStorage.getItem('theme');
    return theme === 'dark';
  } catch {
    return false;
  }
};

const initialState: ThemeState = {
  isDark: loadTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
      
      // Update document class for Tailwind dark mode
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      console.log(`🎨 Theme toggled to: ${state.isDark ? 'dark' : 'light'}`);
    },
    
    initializeTheme: (state) => {
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { toggleTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
