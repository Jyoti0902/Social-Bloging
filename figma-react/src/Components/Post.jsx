import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../ComponentCSS/Post.css';
import { MdDelete } from "react-icons/md";
import { FaHeart, FaComment } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { CommentDo, DeleteComment, UpdateWithPatch, deleteBlog } from '../APIs/endpoints';
import { TiDeleteOutline } from "react-icons/ti";

const Post = ({ post, render, setRender }) => {
  const navigate = useNavigate();
  //Delete API
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
    } catch (error) {
      console.log(error);
    }
  }
  //comment button
  // const handleComment = (postId) => {
  //   const comment = allPosts.map((post) => {
  //     return post._id === postId ? { ...post, comment: !post.comment } : post;
  //   })
  //   setAllPosts(comment);
  // }

  //Like button
  // const toggleLike = (postId) => {
  //   const like = allPosts.map((post) => {
  //     return Update({ ...post, liked: !post.liked }, postId);
  //   })
  //   setAllPosts(like);
  // }
  //....................comments input show with API................
  const [commentShow, setCommentShow] = useState(false);
  const toggleComment = () => {
    if (commentShow === true) {
      setCommentShow(false);
    } else {
      setCommentShow(true)
    }
  }
  const handleDeleteCommment = async (id, commentId) => {
    await DeleteComment(id, commentId);
    setRender(!render);
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
  const [doComment, setDoComment] = useState({
    comments: ""
  });
  const postComments = async (id) => {
    try {
      await CommentDo(doComment, id);
      alert("Comment successfully");
      setRender(!render);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="post-main">
        <div className="post" key={post._id}>
          <div className='edit-icon'><FaRegEdit className='editi' onClick={() => navigate(`/update/${post._id}`)} />
            <MdDelete className='del' onClick={() => handleDelete(post._id)} />
          </div>
          <div className="upperpost">
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
                {/* <p className="font1">100&nbsp;&nbsp;&nbsp;&nbsp;</p> */}
                <FaComment className='comment' onClick={() => toggleComment()} />
                {/* <p className="font1">202</p> */}
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
                <textarea value={doComment.comments} onChange={(e) => setDoComment({ ...doComment, comments: e.target.value })} rows={20} type='text' placeholder='Write a comment here!' />
                <button onClick={() => postComments(post._id)}>Send</button></div>
            </div>
          </div>}


      </div>
    </>
  )
}

export default Post