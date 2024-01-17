import React, { useState } from 'react'
import logo from "../../assets/Instagram-Logo.png"
import { FaPlusSquare } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const profileButtonHandler = () =>  {
        setShowProfileMenu(!showProfileMenu);
    }

    const logoutHandler = () => {
        setShowProfileMenu(false);
        dispatch(logout(navigate));
    }

    const MyProfileHandler = () => {
        setShowProfileMenu(false);
    } 

    const createPostHandler = () => {
        navigate("/user/createPost");
    }

  return (
    <div>
        <div className='h-12 w-full border border-inherit'>
            <div className='flex justify-between h-full w-8/12 mx-auto'>
                {/* logo */}
                <Link to="/" className='h-12 w-32 flex items-center cursor-pointer'>
                    <img src={logo} alt='logo.png' loading='lazy'/>
                </Link>

                {/* useful buttons */}
                <div className='flex items-center gap-4'>
                    {/* create post */}
                    <div>
                        <FaPlusSquare 
                            onClick={createPostHandler}
                            className='h-10 w-10 cursor-pointer'
                        />
                    </div>

                    {/* profile */}
                    <button onClick={profileButtonHandler}>
                        <CgProfile 
                            className='h-10 w-10 cursor-pointer'
                        />
                    </button>
                </div>
            </div>
        </div>

        <div>
            {showProfileMenu && (
                <div className='relative w-8/12 mx-auto flex flex-col items-end'>
                    <div className='absolute border border-inherit w-fit flex flex-col items-center rounded-md font-semibold'>
                        <Link to={"user/profile"}
                            onClick={MyProfileHandler}
                            className='border-b border-inherit px-4 py-1 hover:bg-slate-200 transition duration-75'
                        >
                            My profile
                        </Link>
                        <button onClick={logoutHandler}
                            className='px-4 py-1 hover:bg-slate-200 transition duration-75 w-full'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    
  )
}

export default Navbar
// TODO: make logo a link
// TODO: 