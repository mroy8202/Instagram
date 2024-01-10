import React, { useState } from 'react'
import logo from "../assets/Instagram-Logo.png";
import { useDispatch } from 'react-redux';
import { login } from '../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const handleOnChange = (e) => {
        setFormData( (prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }) )
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        // dispatch 
        dispatch(login(formData, navigate));
        console.log("THIS IS FORMDATA: ", formData);

        // reset 
        setFormData({
            name: "",
            email: "",
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
                    Log in
                </button>

            </form>
        </div>

        <div className='mx-auto lg:w-1/4 md:w-1/2 flex justify-center gap-2 border border-inherit p-2'>
            <p>Don't have an account?</p>
            <Link to="/"
                className='text-cyan-400 font-semibold'
            >
                Sign up
            </Link>
        </div>
    </div>
  )
}

export default Login