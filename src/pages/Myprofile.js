import React, { useEffect } from 'react'
import Spinner from '../components/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDots } from "react-icons/bs";
import { myPost } from "../services/operations/postAPI";
import Post from '../components/Post';

const Myprofile = () => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { myPosts } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(myPost(token));
    }, [])

  return (
    <div className=''>
        {/* My profile information */}
        <div className='w-8/12 mx-auto flex flex-row gap-20 my-6 px-20'>
            {/* profile picture */}
            <div className='h-[150px] w-[150px] rounded-full overflow-hidden'>
                <img src={user.profilePicture} alt='' loading='lazy'
                    className='object-cover'
                />
            </div>

            {/* other information */}
            <div className='h-[150px] flex flex-col justify-evenly'>
                {/* username & follow button */}
                <div className='flex flex-row gap-4'>
                    <p className='font-semibold'>{user.username}</p>
                    <button className='border border-black rounded-md'>
                        Follow
                    </button>
                    <BsThreeDots />
                </div>

                {/* no. of posts, no.of follwers, no.of following */}
                <div className='flex flex-row gap-8'>
                    <p className='font-semibold'>{user.posts.length} <span className='font-normal'>posts</span></p>
                    <p className='font-semibold'>{user.follower.length} <span className='font-normal'>followers</span></p>
                    <p className='font-semibold'>{user.following.length} <span className='font-normal'>followings</span></p>
                </div>

                {/* name */}
                <div>
                    <p className='font-semibold'>
                        {user.name}
                    </p>
                </div>
            </div>
        </div>

        {/* line */}
        <div className='w-8/12 mx-auto border-y border-inherit' ></div>

        {/* My profile posts */}
        <div>
            {
                myPosts.length === 0 ? 
                (
                    <div className='w-8/12 mx-auto'>
                        {/* No posts */}
                        <Spinner />
                    </div>
                ) 
                : 
                (
                    <div className='w-8/12 mx-auto'>
                        {
                            myPosts.map( (post) => (
                                <Post key={post._id} post={post} />
                            ) )
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Myprofile