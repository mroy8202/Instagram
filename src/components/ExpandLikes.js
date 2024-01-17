import React from 'react'
import { useSelector } from 'react-redux'

const ExpandLikes = () => {

    const {likes} = useSelector((state) => state.profile);
    console.log("LIKES --> ", likes);


  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <div className='w-1/4 h-96 border border-inherit text-white bg-black rounded-xl'>
            <div className='flex flex-row justify-center items-center border-b border-black'>
                <p className='text-lg font-semibold'>
                    Likes
                </p>
            </div>

            <div className='p-4 flex flex-col gap-2'>
                {
                    likes && likes.map((like) => (
                        <div key={like._id}
                            className='flex flex-row'
                        >
                            {/* user profile pic */}
                            <div className='h-8 w-8 rounded-full overflow-hidden'>
                                <img src={like.profilePicture} alt='pic' className='h-full w-full object-cover' />
                            </div>

                            {/* username */}
                            <div className='pl-2'>
                                {like.username}
                            </div>
                        </div>
                    ))
                }


                
            </div>
        </div>
    </div>
  )
}

export default ExpandLikes