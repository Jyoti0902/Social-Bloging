import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../ComponentCSS/Post.css';
import { MdDelete } from "react-icons/md";
import { FaHeart, FaComment } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { UpdateWithPatch } from '../APIs/endpoints';
import { TiDeleteOutline } from "react-icons/ti";
import { deleteBlogById, deleteComments, doComments, getAllBlogs } from '../Redux/actions/post';
import { useDispatch } from 'react-redux';

const Post = ({ post, render, setRender }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Delete API
  const handleDelete = async (id) => {
    dispatch(deleteBlogById(id));
    dispatch(getAllBlogs());
    alert("Post deleted successfully!")
  }
  //....................comments input show with API................
  const [commentShow, setCommentShow] = useState(false);
  const toggleComment = () => {
    if (commentShow === true) {
      setCommentShow(false);
    } else {
      setCommentShow(true)
    }
  }

  //....................like button with API................
  const toggleLike = async (postId) => {
    await UpdateWithPatch({ liked: !post.liked }, postId);
    setRender(!render);
  }
  //date format
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const createdDate = new Date(post.created_Date);
  let date = createdDate.getDate();
  let monthIndex = createdDate.getMonth();
  let monthName = months[monthIndex];
  let year = createdDate.getFullYear();
  let currentDate = `${monthName} ${date},${year}`;

  //comments
  const [comments, setComment] = useState({
    comments: ''
  });
  const handlePostComments = (id) => {
    dispatch(doComments({ comments, id }))
    setRender(!render);
    setComment({ ...comments, comments: '' })
    alert("Comment successfully!")
  }
  //delete comments
  const handleDeleteCommment = (id, commentId) => {
    dispatch(deleteComments({ id, commentId }));
    setRender(!render);
    alert("Comment deleted successfully!")
  }

  return (
    <>
      {/* <div className="post-main">
        <div className="post" key={post._id}>
          <div className='edit-icon'><FaRegEdit className='editi' onClick={() => navigate(`/update/${post._id}`)} />
            <MdDelete className='del' onClick={() => handleDelete(post._id)} />
          </div>
          <div className="upperpost" onClick={() => navigate(`/blogdetails/${post._id}`)}>
            <Link to={`http://localhost:5505/${post.image}`}>
              <img className="bg1" src={`http://localhost:5505/${post.image}`} alt="blogs" />
            </Link>
            <p className="font2"><span className='textcolor2'>Title: {post.title}</span><br />
              <span className='textcolor1 des'>{post.description}</span></p>
          </div>
          <div className="post-details">
            <img className="profile-img" src={`http://localhost:5505/${post.image}`} alt='profile' />
            <div className="details">
              <div className="profile-name">
                <p>{post.title}</p>
              </div>
              <div className="other-details">
                <p className="font1">{currentDate}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                {post.liked ? <FaHeart
                  className='like'
                  style={{ color: "red" }}
                  onClick={() => toggleLike(post._id)} />
                  : <FaRegHeart
                    className='like'
                    style={{ color: "black" }}
                    onClick={() => toggleLike(post._id)} />
                }
                <FaComment className='comment' onClick={() => toggleComment()} />
              </div>
            </div>
          </div>
        </div>
        {commentShow &&
          <div className='comments'>
            <div className='show-comments'>
              <h2>Comments:</h2>
              {
                post.postComments.length ? <span>{post.postComments.slice(0, 5).map((item, index) => {
                  return <div className='map-comments'>
                    <p>{item.comments}</p>
                    <div className='del-icon'><TiDeleteOutline onClick={() => handleDeleteCommment(post._id, item._id)} /></div>
                  </div>
                })}</span>
                  : <span>No comment</span>}
            </div>
            <div className='post-comment'>
              <div className='send'>
                <textarea value={comments.comments} onChange={(e) => setComment({ ...comments, comments: e.target.value })} rows={20} type='text' placeholder='Write a comment here!' />
                <button onClick={() => handlePostComments(post._id)}>Send</button></div>
            </div>
          </div>}


      </div> */}
      {/* duplicate */}
      <div className="post-main">
        <div className="blog-img">
          <Link to={`http://localhost:5505/${post.image}`}>
            <img className="blog-photo" src={`http://localhost:5505/${post.image}`} alt="blogs" />
          </Link>
        </div>
        <div className="blog-detail">
          <div>
            <p className="blog-date">{currentDate}</p>
            <p className="blog-title">{post.title}</p>
            <p className='blog-des'>{post.description}Create a blog post subtitle that summarizes your post in a few short, punchy sentences and</p>
          </div>

          <div className='like-comment'>
            <div>{post.liked ? <FaHeart
              style={{ color: "red" }}
              onClick={() => toggleLike(post._id)} />
              : <FaRegHeart
                style={{ color: "black" }}
                onClick={() => toggleLike(post._id)} />
            }</div>
            <div> <FaComment onClick={() => toggleComment()} /></div>
            <div> <FaRegEdit onClick={() => navigate(`/update/${post._id}`)} /></div>
            <div> <MdDelete onClick={() => handleDelete(post._id)} /></div>
          </div>
        </div>
        {commentShow &&
          <div className='comments'>
            <div className='show-comments'>
              <h2>Comments:</h2>
              {
                post.postComments.length ? <span>{post.postComments.slice(0, 5).map((item, index) => {
                  return <div className='map-comments'>
                    <p>{item.comments}</p>
                    <div className='del-icon'><TiDeleteOutline onClick={() => handleDeleteCommment(post._id, item._id)} /></div>
                  </div>
                })}</span>
                  : <span>No comment</span>}
            </div>
            <div className='post-comment'>
              <div className='send'>
                <textarea value={comments.comments} onChange={(e) => setComment({ ...comments, comments: e.target.value })} rows={20} type='text' placeholder='Write a comment here!' />
                <button onClick={() => handlePostComments(post._id)}>Send</button></div>
            </div>
          </div>}

      </div >
    </>
  )
}

export default Post