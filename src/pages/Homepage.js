import React, { useEffect } from 'react'
import { homepagePost } from '../services/operations/postAPI'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'

const Homepage = () => {
  const dispatch = useDispatch();
  const { homepagePosts } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  useEffect( () => {
    dispatch(homepagePost(token));
  }, [] );

  const postClichHandler = (post) => {
    // console.log("this is ", post.user.username);
  }

  return (
    <div className=''>
      <div className='w-8/12 mx-auto flex flex-col bg-gray-100'>
        {
          homepagePosts.length === 0 
          ? <div> No Posts to show </div>
          : 
          homepagePosts.map( (post) => (
            <div key={post._id} onClick={() => postClichHandler(post)}>
              <Post post={post} />
            </div>
          ) )
        }
      </div>
    </div>
  )
}

export default Homepage