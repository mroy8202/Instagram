import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, createComment } from '../services/operations/postAPI';
import { Link } from 'react-router-dom';
import { setCurrentPost } from '../redux/slices/profileSlice';

const Post = ({post}) => {

    const dispatch = useDispatch();
    const { user } = useSelector( (state) => state.profile );
    const { token } = useSelector( (state) => state.auth );

    const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [text, setText] = useState('');

    const LikeHandler = () => {
        const postId = post._id; 
        dispatch(likePost(postId, token));
        setIsLiked(true);
        setLikeCount(prevCount => prevCount + 1);
    }

    const UnLikeHandler = () => {
        const postId = post._id;
        dispatch(unlikePost(postId, token));
        setIsLiked(false);
        setLikeCount(prevCount => Math.max(0, prevCount - 1));
    }

    useEffect(() => {
        setLikeCount(post.likes.length);
    }, [post.likes.length])

    const commentHandler = (e) => {
        e.preventDefault();
        const postId = post._id;
        dispatch(createComment(postId, text, token));
        setText('');
    }

    const handleViewPost = () => {
        dispatch(setCurrentPost(post));
    }

  return (
    <div>
        {/* post head */}
        <div className='w-[60%] mb-8 border border-inherit'>
            <div className='h-12 flex items-center justify-between pl-4 pr-4'>
                <div className='flex items-center gap-2'>
                    {/* round div to store user profile pic */}
                    <div className='h-10 w-10 rounded-full overflow-hidden'>
                        <img src={post.user.profilePicture} alt='img' loading='lazy' 
                            className='h-full w-full object-cover'
                        />
                    </div>

                    {/* username */}
                    <div>
                        <p className='font-semibold'>
                            {post.user.username}
                        </p>
                    </div>
                </div>
                
                {/* Edit actions */}
                <div>
                    <BsThreeDots />
                </div>
            </div>

            {/* post picture */}
            <div className='min-h-48'>
                <img src={post.postPicture} alt='img' loading='lazy'
                />
            </div>

            {/* post footer */}
            <div className='min-h-24'>
                {/* icons */}
                <div className='flex flex-row gap-4 pl-4 pr-4'>
                    {isLiked ? 
                    (
                        <AiFillLike  
                            onClick={UnLikeHandler}
                            className="h-10 w-10"
                        />
                    ) 
                    : 
                    (
                        <AiOutlineLike  
                            onClick={LikeHandler}
                            className="h-10 w-10"
                        />
                    )}
                    
                    
                    <FaRegComment 
                        className="h-10 w-10"
                    />
                </div>

                {/* no of likes */}
                <div className='pl-4 pr-4'>
                    <p className='font-semibold'>
                        {likeCount} likes
                    </p>
                </div>
                
                {/* username & title */}
                <div className='pl-4 pr-4 flex gap-2'>
                    <p className='font-semibold'>
                        {post.user.username}
                    </p>
                    <p>
                        {post.title}
                    </p>
                </div>

                {/* comments */}
                <div className='pl-4 pr-4'>
                    <Link to={"/user/post"}
                        className='text-green-500 '
                        onClick={handleViewPost}
                    >
                        view all comments
                    </Link>
                </div>
            </div>

            {/* create comment form */}
            <form onSubmit={commentHandler}
                className='w-full flex flex-row border-t border-inherit h-10'
            >
                <input
                    type='text'
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder='Add a comment'
                    className='w-full outline-none px-4'
                />
                <button 
                    type='submit'
                    className='text-blue-700 pr-4'
                >
                    Post
                </button>
            </form>
        </div>
    </div>
  )
}

export default Post