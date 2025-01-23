import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useSelector } from 'react-redux';
import Msg from './Msg';

const Login = () => {
  const [status, setStatus] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(login(form)); 
      setTimeout(() => {
        setForm({ email: '', password: '' });
        setStatus({
          type: "success", 
          message: "Login successful! Welcome to the platform 🎉",
        });
      }, 1000);
      
    } catch (error) {
      setTimeout(() => {
        setForm({name: '', email: '', password: '', image: null });
        setStatus({
          type: "error", 
          message: error.message,
        });
      }, 1000);
    }
  };

  const closeMessage = () => {
    setStatus(null); 
  };

  return (
    <div className={`flex flex-col items-center  top-24 overflow-auto right-0 absolute  transition-all ml-4 mt-4 ${
        isOpen ? 'left-56 right-0' : 'left-0 right-0'
    }`}>
        <h1 className="text-2xl text-center font-bold mb-4">Login</h1>
        <div className='flex w-80 bg-gray-400 rounded-md'>
            <form onSubmit={handleSubmit} className="p-4">
            <div className='flex flex-col'>
            <label htmlFor="email" className="font-semibold py-2">Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border bg-transparent w-72 p-2 rounded focus:outline-none"
                required
                autoComplete='off'
            />
            </div>
            <div className='flex flex-col'>
            <label htmlFor="password" className="font-semibold py-2">Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border bg-transparent p-2 rounded focus:outline-none"
                required
                autoComplete='off'
            />
            </div>
            <div className='flex flex-col justify-center'>
                <button type="submit" className="my-5 py-2 w-40 mx-auto text-center rounded bg-gradient-to-r from-teal-400 to-blue-500  hover:from-pink-500 hover:to-orange-500">
                    Login
                </button>
                <p className="text-center">Already have an account? <a href="/signup" className="text-blue-800">Signup</a></p>
            </div>
            </form>
            <div  className='absolute right-0 top-20'>
            {status && (
          <Msg
            type={status.type}
            message={status.message}
            onClose={closeMessage}
            duration={3000} // Auto-dismiss after 3 seconds
          />
        )}
            </div>
        </div>
    </div>
  );
};

export default Login;
