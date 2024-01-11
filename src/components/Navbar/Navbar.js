import React, { useEffect, useState } from 'react'
import logo from "../../assets/Instagram-Logo.png"
import { useSelector } from 'react-redux';
import { searchUser } from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { FaPlusSquare } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {

    const { searchUsers } = useSelector( (state) => state.profile );
    const dispatch = useDispatch();

    const [searchUserText, setSearchUserText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleOnChange = (e) => {
        setSearchUserText(e.target.value);
        console.log("SEARCH: ", searchUserText);
    }

    useEffect(() => {
        dispatch(searchUser(searchUserText));
        setSearchResults(searchUsers);
    }, [searchUserText]);


  return (
    <div className='h-12 w-full border border-inherit'>
        <div className='flex justify-between h-full w-8/12 mx-auto'>
            {/* logo */}
            <div className='h-12 w-32 flex items-center cursor-pointer'>
                <img src={logo} alt='logo.png' loading='lazy'/>
            </div>


            {/* search bar */}
            <div className='w-48 flex items-center'>
                <input
                    type='text'
                    onChange={handleOnChange}
                    placeholder='Search users'
                    autoComplete='name'
                    className='border border-slate-500 rounded p-2 w-full outline-none text-sm'
                />
            </div>

            {/* useful buttons */}
            <div className='flex items-center gap-4'>
                {/* create post */}
                <div>
                    <FaPlusSquare 
                        className='h-10 w-10 cursor-pointer'
                    />
                </div>

                {/* notifications */}
                <div>
                    <FiHeart 
                        className='h-10 w-10 cursor-pointer'
                    />
                </div>

                {/* profile */}
                <div>
                    <CgProfile 
                        className='h-10 w-10 cursor-pointer'
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
// TODO: make logo a link