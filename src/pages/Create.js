import React, { useState } from 'react'
import { createPost } from '../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("postPicture", selectedImage);
        dispatch(createPost(formData, token, navigate));
    }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className='h-48 w-1/3 border border-inherit rounded-lg text-white bg-black'>
            <div className='border-b border-inherit flex justify-center font-semibold text-xl'>
                Create a post
            </div>

            <form onSubmit={handleSubmit} 
                className='flex flex-col gap-2 p-2'>
                <input 
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Enter title'
                    className='border border-inherit rounded-md text-black py-1 px-2 outline-none'
                />

                <input 
                    type='file'
                    accept='image/*'
                    onChange={e => setSelectedImage(e.target.files[0])}
                />

                <button type='submit'
                    className='border border-inherit w-fit mx-auto p-1 rounded-lg '
                >
                    Create Post
                </button>
            </form>
        </div>
    </div>
  )
}

export default Create