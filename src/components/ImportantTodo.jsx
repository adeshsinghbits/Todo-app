import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa";
import {toggleTodo, deleteTodo, importantTodo } from "../features/todoSlice";
import { motion } from "framer-motion";
import { useEffect } from "react";

function ImportantTodo() {
    const todos = useSelector((state) => state.todos.todos);
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
            localStorage.setItem("list", JSON.stringify(todos));
        }, [todos]);

    return (
        <div className={`flex flex-col top-20 right-0 absolute md:ml-10  transition-all ${
            isOpen ? 'md:left-72 right-0' : 'left-0 right-0'
        }`}>
            <div>
                <h3 className="pb-6 text-xl font-semibold">Important Task</h3>
            </div>
            <ul className=" w-full">
            {todos.map((todo) => (
                <motion.li
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                key={todo.id}
                className=" mb-2 rounded"
                >
                { todo.important && (
                        <div className=" flex justify-between border-b-2 border-gray-400">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                className="size-4 ml-4 my-2"
                                onChange={() => dispatch(toggleTodo(todo.id))}
                            />
                                <span className="">
                                    {todo.text}
                                </span>
                                <span className="">
                                    {todo.date
                                    ? new Date(todo.date).toLocaleString()
                                    : "No date"}
                                </span>
                                <button
                                    onClick={() => {dispatch(deleteTodo(todo.id))}}
                                >
                                    <MdDelete size={30}/>
                                </button>
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
    )
}

export default ImportantTodo