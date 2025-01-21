import { FaRegMap, FaRegStar, FaUserClock } from "react-icons/fa"
import userImg from "../assets/user.png"
import { MdAdd, MdCalendarToday, MdOutlineAssignment } from "react-icons/md"
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";

function Sidebar() {
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const todos = useSelector((state) => state.todos.todos);
    const user = useSelector((state) => state.auth.user); 

    const profileImage = user?.image;
    const username = user?.name;
    const today = new Date(Date.now()).toLocaleDateString();
    const todosToday = todos.filter((todo) => new Date(todo.date).toLocaleDateString() == today);
    const completed = todosToday.filter((todo) => todo.completed).length;
    const total = todosToday.length;

    const percentage = (completed / total) * 100;

    useEffect(() => {
            localStorage.setItem("list", JSON.stringify(todos));
    }, [todos]);


return (
    <div className={`flex bg-black  flex-col fixed left-0 top-0   w-80 h-full  rounded-md px-8  transform transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
        <div className="flex flex-col relative top-20 w-60 items-center mt-2">
            <a href="/profile" className="absolute z-50">
                <img 
                    src={profileImage || userImg} 
                    alt="user not found"
                    className=" w-28 h-28 rounded-full"
                />
            </a>
            {username ? (
                <p className="absolute text-black top-32 z-50">Hey, {user.name}</p>
            ) : (
                <p className="absolute text-black top-32 z-50">Hey, user</p>
            )

            }
        </div>
        <div className="flex flex-col w-60 absolute md:top16 top-32 bg-gray-200 text-black pt-28 px-2 ">
        <div className="mx-2 bg-slate-500 py-2 rounded-md">
                <NavLink 
                    to="/todo"
                    className={({ isActive }) => (isActive ? "my-2 px-2 inline-flex text-lg gap-4 bg-gray-300 w-full" : "my-2 px-2 inline-flex text-lg gap-4 hover:bg-gray-300 w-full")}>
                    <MdOutlineAssignment className="mt-1"/> 
                    <p>All Task </p>
                </NavLink>
                <NavLink
                    to="/today"
                    className={({ isActive }) => (isActive ? "my-2 px-2 inline-flex text-lg gap-4 bg-gray-300 w-full" : "my-2 px-2 inline-flex text-lg gap-4 hover:bg-gray-300 w-full")}>
                    <MdCalendarToday className="mt-1"/>  
                    <p>Today</p>
                </NavLink>
                <NavLink  
                    to="/important"
                    className={({ isActive }) => (isActive ? "my-2 px-2 inline-flex text-lg gap-4 bg-gray-300 w-full" : "my-2 px-2 inline-flex text-lg gap-4 hover:bg-gray-300 w-full")}>
                    <FaRegStar className="mt-1"/> 
                    <p>Important</p>
                </NavLink>
                <NavLink 
                    to="/plan"
                    className={({ isActive }) => (isActive ? "my-2 px-2 inline-flex text-lg gap-4 bg-gray-300 w-full" : "my-2 px-2 inline-flex text-lg gap-4 hover:bg-gray-300 w-full")}>
                    <FaRegMap className="mt-1"/> 
                    <p>Planned</p>
                </NavLink>
                <NavLink 
                    to="/assigned"
                    className={({ isActive }) => (isActive ? "my-2 px-2 inline-flex text-lg gap-4 bg-gray-300 w-full" : "my-2 px-2 inline-flex text-lg gap-4 hover:bg-gray-300 w-full")}>
                    <FaUserClock className="mt-1"/> 
                    <p>Assigned to me</p>
                </NavLink>
        </div>
        <div className="mx-2 my-4 bg-slate-500 py-2 rounded-md">
            <button className="my-2 px-2 inline-flex text-lg gap-4 hover:bg-gray-200 w-full"><MdAdd className="mt-1"/> <p>Add list</p></button>
        </div>
        <div className="mx-2 bg-slate-500 mb-4 rounded-md">
            <div className="px-2 flex justify-between text-lg  w-full align-top">
                <div>
                <h3>Today Task</h3>
                { user ? (
                    <h4>
                    {todosToday.length}
                </h4>
                ) : (
                    <h4>0</h4>
                )

                }
                </div>
                <button><IoMdInformationCircleOutline size={24}/></button>
            </div>
            {user ? (
                <div className=" my-6 mx-2 bg-gray-200 rounded-lg h-6 relative">
                <div
                    className="bg-blue-500 h-6 rounded-lg transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                ></div>
                <div className="absolute inset-0 flex justify-center items-center text-sm font-medium text-gray-800">
                    {completed} / {total} ({Math.round(percentage) || 0 }%) 
                </div>
            </div>
            ) : (
                <div className=" my-6 mx-2 bg-gray-200 rounded-lg h-6 relative">
                <div
                    className="bg-blue-500 h-6 rounded-lg transition-all duration-300"
                    style={{ width: `${0}%` }}
                ></div>
                <div className="absolute inset-0 flex justify-center items-center text-sm font-medium text-gray-800">
                    {0} / {0} ({Math.round(0) || 0 }%) 
                </div>
            </div>
            )

            }
        </div>
        </div>
    </div>
    );
}

export default Sidebar