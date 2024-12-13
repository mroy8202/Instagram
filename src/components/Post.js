import React, { useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, createComment, viewLikes } from '../services/operations/postAPI';
import { Link } from 'react-router-dom';
import { setCurrentPost } from '../redux/slices/profileSlice';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [text, setText] = useState('');

  const LikeHandler = () => {
    const postId = post._id;
    dispatch(likePost(postId, token));
    setIsLiked(true);
    setLikeCount((prevCount) => prevCount + 1);
  };

  const UnLikeHandler = () => {
    const postId = post._id;
    dispatch(unlikePost(postId, token));
    setIsLiked(false);
    setLikeCount((prevCount) => Math.max(0, prevCount - 1));
  };

  useEffect(() => {
    setLikeCount(post.likes.length);
  }, [post.likes.length]);

  const commentHandler = (e) => {
    e.preventDefault();
    const postId = post._id;
    dispatch(createComment(postId, text, token));
    setText('');
  };

  const handleViewPost = () => {
    dispatch(setCurrentPost(post));
  };

  const viewLikesHandler = () => {
    const postId = post._id;
    dispatch(viewLikes(postId, token));
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6 border rounded-lg shadow-md bg-white overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src={post.user.profilePicture}
              alt="User"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="font-medium text-gray-800 text-sm">{post.user.username}</p>
        </div>
        <BsThreeDots className="text-gray-600 cursor-pointer text-lg" />
      </div>

      {/* Post Image */}
      <div className="">
        <img
          src={post.postPicture}
          alt="Post"
          loading="lazy"
          className="w-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-3">
          {isLiked ? (
            <AiFillLike
              onClick={UnLikeHandler}
              className="text-red-500 text-xl cursor-pointer"
            />
          ) : (
            <AiOutlineLike
              onClick={LikeHandler}
              className="text-gray-500 text-xl cursor-pointer hover:text-red-500"
            />
          )}
          <FaRegComment className="text-gray-500 text-xl cursor-pointer hover:text-blue-500" />
        </div>

        {/* Like Count */}
        <p className="mt-1 text-sm font-medium text-gray-800">
          <Link to="/user/post/likes" onClick={viewLikesHandler} className="hover:underline">
            {likeCount} likes
          </Link>
        </p>

        {/* Post Title */}
        <div className="flex gap-1 mt-1">
          <p className="font-medium text-gray-800 text-sm">{post.user.username}</p>
          <p className="text-gray-600 text-sm">{post.title}</p>
        </div>

        {/* View Comments */}
        <Link
          to="/user/post"
          onClick={handleViewPost}
          className="text-blue-500 text-xs hover:underline mt-1 inline-block"
        >
          View all comments
        </Link>
      </div>

      {/* Comment Form */}
      <form onSubmit={commentHandler} className="flex items-center border-t px-3 py-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border-none outline-none px-2 text-gray-700 text-sm"
          maxLength={40}
        />
        <button
          type="submit"
          className="text-blue-600 text-sm font-medium hover:text-blue-800"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
