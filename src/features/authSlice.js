import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('currentUser')) || null,
    users: JSON.parse(localStorage.getItem('users')) || [],
  },
  reducers: {
    signup: (state, action) => {
      const newUser = action.payload;

      const existingUser = state.users.find((user) => user.email === newUser.email);
      if (existingUser) throw new Error('Email already registered.');

      state.users.push(newUser); 

      localStorage.setItem('users', JSON.stringify(state.users)); 
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) throw new Error('Invalid email or password.');

      state.user = user;
      localStorage.setItem('currentUser', JSON.stringify(user)); 
    },
    logout: (state) => {
      state.user = null; 
      localStorage.removeItem('currentUser'); 
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
