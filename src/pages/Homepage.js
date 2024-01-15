import React, { useEffect } from 'react'
import { homepagePost } from '../services/operations/postAPI'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import Spinner from "../components/Spinner"

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
      <div className='w-8/12 mx-auto flex flex-col'>
        {
          homepagePosts.length === 0 
          ? <Spinner />
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