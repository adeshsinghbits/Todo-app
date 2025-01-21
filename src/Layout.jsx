import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import { useEffect } from "react"
import { useSelector } from "react-redux"

function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <Header/>
        <Outlet />
        <Sidebar/>
    </div>
  )
}

export default Layout