import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Todo from "./components/Todo";
import Layout from "./Layout";
import TodayComponent from "./components/TodayComponent";
import ImportantTodo from "./components/ImportantTodo";
import ProfilePage from "./components/profile";
import Plan from "./components/Plan";
import AssignMe from "./components/AssignMe";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user); 

  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path="/todo" element={user ? <Todo /> : <Navigate to='/login'/> }/>
            <Route path="/today" element={user ? <TodayComponent /> : <Navigate to='/login'/> } />
            <Route path="/important" element={user ? <ImportantTodo /> : <Navigate to='/login'/> } />
            <Route path="/today" element={user ? <TodayComponent />  : <Navigate to='/login'/> } />
            <Route path="/profile" element={ <ProfilePage /> }  />
            <Route path="/plan" element={user ? <Plan /> : <Navigate to='/login'/> } />
            <Route path="/assigned" element={user ? <AssignMe /> : <Navigate to='/login'/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App