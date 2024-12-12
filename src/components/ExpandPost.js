import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, viewLikes } from '../services/operations/postAPI';
import { Link } from 'react-router-dom';

const ExpandPost = () => {
    const dispatch = useDispatch();
    const { currentPost } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const [text, setText] = useState('');

    const commentHandler = (e) => {
        e.preventDefault();
        const postId = currentPost._id;
        dispatch(createComment(postId, text, token));
        setText('');
    };

    const viewLikesHandler = () => {
        const postId = currentPost._id;
        dispatch(viewLikes(postId, token));
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
            <div className="h-[80%] w-[85%] flex flex-col lg:flex-row shadow-2xl rounded-lg bg-white">
                {/* Post Image */}
                <div className="h-1/2 lg:h-full w-full lg:w-1/2 overflow-hidden rounded-t-lg lg:rounded-l-lg lg:rounded-t-none">
                    <img 
                        src={currentPost.postPicture} 
                        alt="Post" 
                        className="h-full w-full object-cover rounded-tl-lg" 
                    />
                </div>

                {/* Post Details */}
                <div className="h-full w-full lg:w-1/2 p-4 flex flex-col bg-gray-900 text-white rounded-r-lg">
                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img 
                                src={currentPost.user.profilePicture} 
                                alt="User" 
                                className="h-full w-full object-cover" 
                            />
                        </div>
                        <p className="font-semibold text-white">{currentPost.user.username}</p>
                    </div>

                    {/* Comments */}
                    <div className="flex-1 overflow-y-auto mb-4">
                        {currentPost.comments.map((comment) => (
                            <div 
                                key={comment._id} 
                                className="flex items-start gap-4 mb-3 border-b pb-2">
                                <div className="h-8 w-8 rounded-full overflow-hidden">
                                    <img 
                                        src={comment.user.profilePicture} 
                                        alt="Comment User" 
                                        className="object-cover" 
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">
                                        {comment.user.username}
                                    </p>
                                    <p className="text-gray-300 text-sm">{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t pt-4">
                        <Link 
                            to="/user/post/likes" 
                            onClick={viewLikesHandler} 
                            className="font-semibold text-blue-500 hover:underline">
                            {currentPost.likes.length} likes
                        </Link>

                        {/* Comment Form */}
                        <form 
                            onSubmit={commentHandler} 
                            className="flex items-center mt-3">
                            <input
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 border rounded-md px-3 py-2 text-sm outline-none"
                                maxLength={40}
                            />
                            <button 
                                type="submit" 
                                className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-600">
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandPost;
