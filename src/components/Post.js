import React from 'react'
import { BsThreeDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";

const Post = ({post}) => {
    console.log("POST: ", post);
  return (
    <div>
        {/* post head */}
        <div className='w-[60%]'>
            <div className='h-12 border border-inherit flex items-center justify-between pl-4 pr-4'>
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
                    className=''
                />
            </div>

            {/* post footer */}
            <div className='min-h-24'>
                {/* icons */}
                <div className='flex flex-row gap-4 pl-4 pr-4'>
                    <FcLike 
                        className="h-10 w-10"
                    />
                    {/* <FcDislike 
                        className="h-10 w-10"
                    /> */}
                    <FaRegComment 
                        className="h-10 w-10"
                    />
                </div>

                {/* no of likes */}
                <div className='pl-4 pr-4'>
                    <p className='font-semibold'>
                        {post.likes.length} likes
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
                    
                </div>
            </div>
        </div>
        


    </div>
  )
}

export default Post