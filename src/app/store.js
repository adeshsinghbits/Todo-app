import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";
import sidebarReducer from "../features/sidebarSlice";
import themeReducer from '../features/themeSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    sidebar: sidebarReducer,
    theme: themeReducer,
    auth: authReducer,
    },
});



