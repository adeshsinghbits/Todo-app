import { FaBars } from "react-icons/fa"
import { useDispatch, useSelector} from 'react-redux';
import { toggleSidebar } from '../features/sidebarSlice';
import { toggleTheme } from "../features/themeSlice";
import { CiDark, CiLight } from "react-icons/ci";
import { setSearchQuery } from "../features/todoSlice";

function Header() {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.darkMode);
    const{ searchQuery } = useSelector((state) => state.todos);
    
return (
    <div className=" fixed top-0 left-0 right-0 z-50 flex justify-between bg-slate-500 ">
        <div className="flex">
        <button onClick={() => dispatch(toggleSidebar())} >
            <FaBars className="text-white text-2xl ml-3 my-2"/>
        </button>
        <a 
            href="/"
            className="text-white hidden md:block font-bold text-xl ml-3 my-auto">TODOBITS</a>
        </div>
        <div className="flex my-2">
            <input
                type="text"
                placeholder="Search todos..."
                className="w-full px-4 py-2 mr-4 border rounded-md focus:outline-none focus:ring-2 text-black "
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                value={searchQuery}
            />
            { theme ? (
                <button onClick={() => dispatch(toggleTheme())} className="text-white text-2xl mr-6 my-2">
                    <CiLight /> 
                </button>
            ) : (   
                <button onClick={() => dispatch(toggleTheme())} className="text-white text-2xl mr-6 my-2">
                    <CiDark/> 
                </button>
            )

            }
        </div>
    </div>
)
}

export default Header