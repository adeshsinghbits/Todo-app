import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../features/authSlice';
import { useSelector } from 'react-redux';
import { useId } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({name: '', email: '', password: '', image: null, id: useId() });
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result }); // Save base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
          dispatch(signup(form)); 
          navigate('/login');
          alert('SignUp successful!');
        } catch (error) {
          alert(error.message);
        }
  };

  return (
    <div className={`flex flex-col items-center top-12 overflow-auto right-0 absolute  transition-all ml-4 mt-4 ${
      isOpen ? 'left-72 right-0' : 'left-0 right-0'
  }`}>
    <h1 className="text-2xl text-center font-bold mb-4">Sign Up</h1>
    <div className="bg-gray-400 w-80 rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-semibold py-2">Full Name</label>
          <input
            type="name"
            name="name"
            placeholder="Your Full Name"
            value={form.name}
            onChange={handleChange}
            className="border bg-transparent p-2 w-72 rounded focus:outline-none"
            required
            autoComplete='off'
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-semibold py-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border bg-transparent p-2 w-72 rounded focus:outline-none"
            required
            autoComplete='off'
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold py-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border bg-transparent w-72 p-2 rounded focus:outline-none"
            required
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-transparent w-72 p-2 rounded focus:outline-none"
        />
        <div className="flex flex-col mb-4">
          <button type="submit" className="my-5 py-2 w-40 mx-auto text-center rounded bg-gradient-to-r from-teal-400 to-blue-500  hover:from-pink-500 hover:to-orange-500">
            Sign Up
          </button>
          <p className="text-center">Already have an account? <a href="/login" className="text-blue-800">Login</a></p>
        </div>
      </form>
    </div>
  </div>
    
  );
};

export default Signup;
