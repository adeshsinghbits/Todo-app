import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  return storedTheme === 'dark'; // Return true if storedTheme is 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: { darkMode: getInitialTheme() },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light'); // Save to localStorage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
