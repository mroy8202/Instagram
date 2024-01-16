import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, viewLikes } from '../services/operations/postAPI';
import { Link } from 'react-router-dom';

const ExpandPost = () => {
    const dispatch = useDispatch();
    const { currentPost } = useSelector((state) => state.profile);
    // console.log("My current post is: ", currentPost);
    const {token} = useSelector((state) => state.auth);
    const [text, setText] = useState('');
    // const [comments, setComments] = useState(currentPost.comments);

    // useEffect(() => {
    //     setComments(currentPost.comments);
    //   }, [currentPost.comments]);

    const commentHandler = (e) => {
        e.preventDefault();
        const postId = currentPost._id;
        dispatch(createComment(postId, text, token));
        setText('');
    }

    const viewLikesHandler = () => {
        const postId = currentPost._id;
        dispatch(viewLikes(postId ,token));
    }

  return (
    <div className='h-screen w-screen flex items-center justify-center'>
        <div className='h-[90%] w-[90%] flex flex-row text-white bg-black'>
            {/* post */}
            <div className='h-full w-1/2 border border-inherit overflow-hidden'>
                <img src={currentPost.postPicture} alt='post-img'
                    className='h-full w-full object-cover'
                />
            </div>

            {/* post details */}
            <div className='h-full w-1/2 border border-inherit relative'>
                {/* userpic & username */}
                <div className='h-12 border-b border-inherit px-4 flex items-center gap-4'>
                    <div className='h-10 w-10 rounded-full overflow-hidden'>
                        <img src={currentPost.user.profilePicture} alt='pic'
                            className='object-cover'
                        />
                    </div>
                    <div className='font-semibold'>
                        {currentPost.user.username}
                    </div>
                </div>

                {/* comments */}
                <div className='flex flex-col gap-2 py-4'>
                    {
                        currentPost.comments.map( (comment) => (
                            <div key={comment._id}
                                className='px-4 flex flex-row gap-4'
                            >
                                <div className='h-8 w-8 rounded-full overflow-hidden'>
                                    <img src={comment.user.profilePicture} alt='pic' 
                                        className='object-cover'
                                    />
                                </div>
                                <p className='font-semibold'>
                                    {comment.user.username}
                                </p>
                                <p>{comment.text}</p>
                            </div>
                        ) )
                    }
                </div>

                {/* footer */}
                <div className='absolute bottom-0 left-0 right-0 h-20 border-t border-black'>
                    <div>
                        <Link to={'/user/post/likes'} 
                            onClick={viewLikesHandler}
                            className='px-4 font-semibold'>
                            {currentPost.likes.length} likes
                        </Link>
                        {/* comment form */}
                        <form onSubmit={commentHandler}
                            className='w-full flex flex-row border-t border-white h-10'
                        >
                            <input
                                type='text'
                                value={text}
                                onChange={e => setText(e.target.value)}
                                placeholder='Add a comment'
                                className='w-full outline-none px-4 bg-black'
                                maxLength={40}
                            />
                            <button 
                                type='submit'
                                className='text-white text-semibold pr-4'
                            >
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExpandPost