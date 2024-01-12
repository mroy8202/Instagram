import React, { useEffect } from 'react'
import { homepagePost } from '../services/operations/postAPI'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../components/Post'
import Spinner from "../components/Spinner"

const Homepage = () => {
  const dispatch = useDispatch();
  const { homepagePosts } = useSelector((state) => state.profile);

  useEffect( () => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch(homepagePost(token));
  }, [] );

  // useEffect(() => {
  //   console.log("HOMEPAGE POSTS: ", homepagePosts);
  // })


  return (
    <div className=''>
      <div className='w-8/12 mx-auto flex flex-col'>
        {
          homepagePosts.length === 0 
          ? <Spinner />
          : 
          homepagePosts.map( (post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ) )
        }
      </div>
    </div>
  )
}

export default Homepage