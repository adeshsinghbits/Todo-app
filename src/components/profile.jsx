import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { IoLogOut } from 'react-icons/io5';

const Profile = () => {
  const user = useSelector((state) => state.auth.user); 
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    alert('You have been logged out!');
  };

  if (!user) {
   
    return (
      <div className={`flex flex-col top-12 overflow-auto right-0 absolute  transition-all ml-4 mt-4 ${
        isOpen ? 'left-72 right-0' : 'left-0 right-0'
    }`}>
        <h1 className="text-2xl font-bold mb-4">No User Logged In</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col top-12 overflow-auto right-0 absolute  transition-all ml-4 mt-4 ${
        isOpen ? 'left-72 right-0' : 'left-0 right-0'
    }`}>
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="bg-gray-400 flex justify-between  shadow-md rounded-lg py-2 px-5  mx-5 items-center">
        <div className="flex items-center">
        {user.image ? (
          <img
            src={user.image}
            alt="User Profile"
            className="w-24 h-24 shadow-lg rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
            <div className='ml-8'>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="">{user.email}</p>      
            </div>          
        </div>
        <button
          onClick={handleLogout}
          className='active:scale-90'
        >
          <IoLogOut  size={30} />
          <p>Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Profile;
