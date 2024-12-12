import React, { useState } from 'react';
import { createPost } from '../services/operations/postAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("postPicture", selectedImage);
        dispatch(createPost(formData, token, navigate));
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="max-w-lg w-full bg-gray-900 p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold text-white">Create a Post</h2>
                    <p className="text-gray-400 text-sm mt-2">Share your thoughts and ideas with the world!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    </div>

                    {/* Image Input */}
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;
