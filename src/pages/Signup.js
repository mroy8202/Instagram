import React, { useState } from 'react'
import logo from "../assets/Instagram-Logo.png"
import { useDispatch } from 'react-redux';
// import { setSignupData } from '../redux/slices/authSlice';
import { signUp } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });

    const { name, email, username, password } = formData;

    const handleOnChange = (e) => {
        setFormData( (prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }) )
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        // dispatch 
        dispatch(signUp(formData, navigate));
        console.log("THIS IS FORMDATA: ", formData);

        // reset 
        setFormData({
            name: "",
            email: "",
            username: "",
            password: ""
        });
    }

  return (
    <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2 mx-auto lg:w-1/4 md:w-1/2 border border-inherit mt-10 pt-10 pb-10'>
            {/* logo */}
            <div className='h-1/6 flex justify-center items-center'>
                <img src={logo} alt='logo.png' loading='lazy'
                    className='h-[50px] w-[174px]'
                />
            </div>

            {/* signup form */}
            <form onSubmit={handleOnSubmit}
                className='pl-10 pr-10 flex flex-col gap-2'
            >
                <div>
                    <input
                        required
                        type='text'
                        name='name'
                        value={name}
                        onChange={handleOnChange}
                        placeholder='Enter your name'
                        autoComplete='name'
                        className='border border-slate-500 rounded p-2 w-full outline-none text-sm'
                    />
                </div>
                <div>
                    <input
                        required
                        type='text'
                        name='email'
                        value={email}
                        onChange={handleOnChange}
                        placeholder='Enter email address'
                        autoComplete='email'
                        className='border border-slate-500 rounded p-2 w-full outline-none text-sm'
                    />
                </div>
                <div>
                    <input
                        required
                        type='text'
                        name='username'
                        value={username}
                        onChange={handleOnChange}
                        placeholder='Enter your username'
                        autoComplete='username'
                        className='border border-slate-500 rounded p-2 w-full outline-none text-sm'
                    />
                </div>
                <div>
                    <input
                        required
                        type='password'
                        name='password'
                        value={password}
                        onChange={handleOnChange}
                        placeholder='Enter your password'
                        autoComplete='password'
                        className='border border-slate-500 rounded p-2 w-full outline-none text-sm'
                    />
                </div>

                {/* button */}
                <button type='submit'
                    className='w-full bg-cyan-600 rounded text-white font-semibold p-1'
                >
                    Sign up
                </button>

            </form>
        </div>

        <div className='mx-auto lg:w-1/4 md:w-1/2 flex justify-center gap-2 border border-inherit p-2'>
            <p>Have an account?</p>
            <Link to="/login"
                className='text-cyan-400 font-semibold'
            >
                Log in
            </Link>
        </div>
    </div>
    
  )
}

export default Signup