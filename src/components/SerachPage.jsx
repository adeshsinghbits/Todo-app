import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, setSearchQuery } from "../features/todoSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { items, searchQuery } = useSelector((state) => state.todos);

  const filteredTodos = items.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search todos..."
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          value={searchQuery}
        />

        {/* Todo List */}
        <ul className="space-y-2">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-2 border rounded-md ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <span>{todo.text}</span>
              <button
                onClick={() => dispatch(toggleTodo(todo.id))}
                className="text-sm text-blue-500 hover:underline"
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
