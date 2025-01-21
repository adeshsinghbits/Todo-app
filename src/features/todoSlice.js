import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
  todos: JSON.parse(localStorage.getItem("list")) || [],
  filteredItems: [],
  searchQuery: "",
};


const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({ id: nanoid(), text: action.payload[0], date: action.payload[1].toLocaleString(), completed: false, important: false });
  
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      
      state.filteredItems = state.todos.filter((todo) =>
        todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    importantTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.important = !todo.important;
      }
      state.filteredItems = state.todos.filter((todo) =>
        todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredItems = state.todos.filter((todo) =>
        todo.text.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, importantTodo, setSearchQuery } = todoSlice.actions;
export default todoSlice.reducer;
