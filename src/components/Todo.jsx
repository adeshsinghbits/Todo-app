import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, importantTodo} from "../features/todoSlice";
import { MdDelete } from "react-icons/md";
import { FaStar, FaRegStar} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";

function Todo() {
    const [text, setText] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const todos = useSelector((state) => state.todos.todos);
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const {filteredItems, searchQuery} = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleAddTodo = () => {
        if (text.trim() !== "") {
        dispatch(addTodo([text, selectedDate]));
        setText("");
        setSelectedDate("")
        }
    };

    
    
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(todos));
    }, [todos]);
    
    return (
        <div className={`flex flex-col top-12 overflow-auto right-0 absolute  transition-all ml-4 mt-4 ${
            isOpen ? ' md:left-72 right-0' : 'left-0 right-0'
        }`}>
        <div className="pl-6 text-xl font-semibold">
            <h2>To do</h2>
        </div>
        <div className="md:flex ">
        <div className=" p-6 max-w-2xl md:w-1/2   shadow-md">
            <div className="flex relative mb-4 h-32 rounded-lg bg-gray-300 border-b-2 border-gray-600">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 px-4 py-2 h-20 text-black  rounded-l-lg focus:outline-none bg-transparent"
                placeholder="Add a new task"
            />
            <div className="absolute bottom-0  left-0">
                <ReactDatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MMMM DD, yyyy"
                    placeholderText= "+ due date"
                    className="text-gray-900 input bg-transparent focus:outline-none ml-2 mb-2"
                />
            </div>
            <button
                onClick={handleAddTodo}
                className="bg-blue-500 absolute bottom-0 right-0 h-12 w-20 text-white px-4 py-2 mb-2 mr-2 rounded-lg hover:bg-blue-600"
            >
                Add
            </button>
            </div>
            {searchQuery === "" ? (
                <ul className="w-full  overflow-auto">
                {todos.map((todo) => (
                    <motion.li
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    key={todo.id}
                    className="flex w-full justify-between border-b-2 border-gray-600 px-4 py-2 rounded mt-3"
                    >
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        className="size-4 mr-4"
                        onChange={() => dispatch(toggleTodo(todo.id))}
                    />
                    <span className="">
                        {todo.text}
                    </span>
                    <span className="">
                        {todo.date
                            ? new Date(todo.date).toLocaleDateString()
                            : "No date"}
                    </span>
                    <button
                        onClick={() => {dispatch(deleteTodo(todo.id))}}
                    >
                        <MdDelete  size={30}/>
                    </button>
                    <button
                        onClick={() => {dispatch(importantTodo(todo.id))}}
                        >
                        {todo.important ? <FaStar  size={30}/> : <FaRegStar size={30}/>}
                    </button>
                    </motion.li>
                ))}
                </ul>
            ) : (
                <ul className="space-y-2">
                {filteredItems.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex w-full justify-between border-b-2 border-gray-600 px-4 py-2 rounded mt-3"
                    >
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        className="size-4 mr-4"
                        onChange={() => dispatch(toggleTodo(todo.id))}
                    />
                    <span className="">
                        {todo.text}
                    </span>
                    <span className="">
                        {todo.date
                            ? new Date(todo.date).toLocaleDateString()
                            : "No date"}
                    </span>
                    <button
                        onClick={() => {dispatch(deleteTodo(todo.id))}}
                    >
                        <MdDelete  size={30}/>
                    </button>
                    <button
                        onClick={() => {dispatch(importantTodo(todo.id))}}
                        >
                        {todo.important ? <FaStar  size={30}/> : <FaRegStar size={30}/>}
                    </button>
                    </li>
                ))}
                </ul>
            )

            }
        </div>
        <div className="w-full ml-8 font-semibold">
            <h3 className="text-xl">Completed</h3>
            <div>
            <ul>
            {todos.map((todo) => (
                <motion.li
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                key={todo.id}
                className=" w-full rounded-md"
                >
                { todo.completed && (
                    <div className="flex justify-between border-b-2 border-gray-600 w-full p-4 mt-3">
                        <input
                    type="checkbox"
                    checked={todo.completed}
                    className="size-4 mr-4"
                    onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span className="line-through">
                    {todo.text}
                </span>
                <span >
                    {todo.date
                    ? new Date(todo.date).toISOString().split('T')[0]
                    : "No date"}
                </span>
                <button
                    onClick={() => {dispatch(importantTodo(todo.id))}}
                    >
                    {todo.important ? <FaStar  size={30}/> : <FaRegStar size={30}/>}
                </button>
                </div>
                )
                }
            </motion.li>
            ))}
            </ul>
            </div>
        </div>
        </div>
    </div>
);
}

export default Todo;
